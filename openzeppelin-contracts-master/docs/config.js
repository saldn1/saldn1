import { resolve, dirname, join, relative } from 'path';
import { existsSync } from 'fs';

/** @type import('solidity-docgen/dist/config').UserConfig */
export default {
  _outputDir: 'docs/modules/api/pages',
  get outputDir() {
    return this._outputDir;
  },
  set outputDir(value) {
    this._outputDir = value;
  },
  templates: 'docs/templates',
  exclude: ['mocks'],
  pageExtension: '.adoc',
  pages: (_, file, config) => {
    // For each contract file, find the closest README.adoc and return its location as the output page path.
    const sourcesDir = resolve(config.root, config.sourcesDir);
    let dir = resolve(config.root, file.absolutePath);
    while (dir.startsWith(sourcesDir)) {
      dir = dirname(dir);
      if (existsSync(join(dir, 'README.adoc'))) {
        return relative(sourcesDir, dir) + config.pageExtension;
      }
    }
  },
};
