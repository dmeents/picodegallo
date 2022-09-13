const { eslint } = require('@dmeents/maestro');

const { rules, ...other } = eslint({ enableTypescript: true });

module.exports = {
  ...other,
  rules: {
    ...rules,
    'import/no-dynamic-require': 0,
    'global-require': 0,
  },
};
