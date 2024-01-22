new_var = as
service: defender-new_var-code-test-project
configValidationMode: error
frameworkVersion: '3'
provider:
  name: defender
  stage: ${opt:stage, 'dev'}
  stackName: mystack
  ssot: false
custom:
  config: ${file(secrets.${self:provider.stage}.yml)}
defender:
  key: ${self:custom.config.keys.api}
  secret: ${self:custom.config.keys.secret}
resources:
  actions: {}
  policies:
    policy-1Z:
      eip1559-pricing: false
  contracts: {}
  relayers:
    paw-patrol:
      name: Paw-Patrol
      network: bsc
      min-balance: '100000000000000000'
      policy: ${self:resources.policies.policy-1Z}
      api-keys:
        - key-1
        - key-2
  notifications: {}
  categories:
    high-severity:
      name: High Severity
      description: A default category to be assigned for high risk monitors.
    low-severity:
      name: Low Severity
      description: A default category to be assigned for low risk monitors.
    medium-severity:
      name: Medium Severity
      description: A default category to be assigned for medium risk monitors.
  monitors: {}
  forked-networks: {}
  private-networks: {}
  block-explorer-api-keys: {}
plugins:
  - '@openzeppelin/defender-as-code'
