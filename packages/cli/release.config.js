// eslint-disable-next-line import/no-unresolved
const { semantic } = require('@dmeents/maestro');

module.exports = { ...semantic({ isMonorepo: true, publishToNpm: false }) };
