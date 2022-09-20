const { jest } = require('@dmeents/maestro');

module.exports = {
  ...jest({ packageName: 'cli', isNode: true, tsconfig: 'tsconfig.json' }),
};
