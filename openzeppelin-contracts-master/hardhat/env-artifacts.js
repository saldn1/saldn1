const { HardhatError } = require('hardhat/internal/core/errors');

extendEnvironment((env) => {
  const artifactsRequire = env.artifacts.require;
  const suffixes = ['UpgradeableWithInit', 'Upgradeable', ''];

  env.artifacts.require = (name) => {
    let artifact;
    for (const suffix of suffixes) {
      try {
        artifact = artifactsRequire(`${name}${suffix}`);
        break;
      } catch (e) {
        if (HardhatError.isHardhatError(e) && e.number === 700 && suffix !== '') {
          continue;
        } else {
          throw e;
        }
      }
    }
    if (!artifact) {
      throw new Error('Unreachable');
    };
  });
