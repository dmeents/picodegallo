const { jest } = require('@dmeents/maestro');

module.exports = {
  ...jest({
    isNode: true,
    isRoot: true,
    namespace: '@picodegallo',
    tsconfig: 'tsconfig.json',
  }),
};
