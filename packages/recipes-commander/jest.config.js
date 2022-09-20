const { jest } = require('@dmeents/maestro');

module.exports = {
  ...jest({
    packageName: 'recipes-commander',
    isNode: true,
  }),
};
