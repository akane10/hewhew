const { defaults } = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  coveragePathIgnorePatterns: ['/node_modules/', '/boilerplates/']
};
