// archway-cli/util/build.js

const { spawn } = require("child_process");
const FileSystem = require('fs');

function tryBuilding() {
  let configPath = process.cwd() + '/config.json';
  FileSystem.access(configPath, FileSystem.F_OK, (err) => {
    if (err) {
      console.error('Error locating dApp config at path ' + configPath + '. Please run this command from the root folder of an Archway project.');
      return;
    } else {
      console.log('Building project...\n');

      let config = require(configPath);
      let scripts = config.developer.scripts;
      let buildScript = {};
      buildScript.raw = scripts.build;
      buildScript.arr = buildScript.raw.split(' ');
      buildScript.cmd = buildScript.arr[0];
      buildScript.params = buildScript.arr.slice(1);

      const source = spawn(buildScript.cmd, buildScript.params, { stdio: 'inherit' });

      source.on('error', (err) => {
        console.log('Error building project', err);
      });
    }
  });
};

const buildRunner = () => {
  try {
    tryBuilding();
  } catch(e) {
    console.error('Error calling build script', e);
  }
};

module.exports = buildRunner;