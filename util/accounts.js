// archway-cli/util/accounts.js

const { spawn } = require("child_process");
const commands  = require('../constants/commands');

// We assign the right daemon command in the main function and use it in the rest of the code
let archwaydCmd = null;

async function getListAccounts() {
  console.log('Printing list of active accounts...\n');

  source = spawn(archwaydCmd.cmd, [...archwaydCmd.args, 'keys', 'list'], { stdio: 'inherit'});
  
  // Listeners
  source.on('error', (err) => {
    console.log('Error listing keys', err);
  });

  source.on('close', () => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    readline.question('Add new account? (Y/N default: N): ', addAccount => {
      if (addAccount.toLowerCase() !== 'y' && addAccount.toLowerCase() !== 'yes') {
        console.log('Ok!');
        readline.close();
      } else {
        readline.question('Name of account to be added: ', accountName => {
          if (!accountName || accountName.length < 3 || typeof accountName !== 'string') {
            readline.close();
          } else {
            doAddAccount(accountName);
            readline.close();
          }
        });
      }
    });
  });
};

async function doAddAccount(name = null) {
  if (!name) {
    console.log('Error adding account with name', name);
    return process.exit();
  } else if (typeof name !== 'string') {
    console.log('Account label must be a string but got ', typeof name);
    return process.exit();
  }

  const source = spawn(archwaydCmd.cmd, [...archwaydCmd.args, 'keys', 'add', name], { stdio: 'inherit' });
  
  source.on('error', (err) => {
    console.log(`Error adding wallet ${name} to keychain`, err);
  });
};

const listAccounts = async (docker, add = false, name = null) => {
  archwaydCmd = docker ? commands.ArchwayDocker : commands.ArchwayBin;
  if (!add || !name) {
    getListAccounts();
  } else {
    doAddAccount(name);
  }
};

module.exports = listAccounts;