// archway-cli/util/index.js

const Accounts = require('./accounts');
const Build = require('./build');
const Configure = require('./configure');
const Deploy = require('./deploy');
const DeployHistory = require('./deployments');
const Faucet = require('./faucet');
const Network = require('./network');
const New = require('./new');
const Query = require('./query');
const Script = require('./script');
const Test = require('./test');
const Tx = require('./tx');

module.exports = {
  Accounts: Accounts,
  Build: Build,
  Configure: Configure,
  Deploy: Deploy,
  DeployHistory: DeployHistory,
  Faucet: Faucet,
  Network: Network,
  New: New,
  Query: Query,
  Script: Script,
  Test: Test,
  Tx: Tx
};