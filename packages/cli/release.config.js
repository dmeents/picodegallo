const { semantic } = require('@dmeents/maestro');

module.exports = { ...semantic({ isMonorepo: true, publishToNpm: true }) };
