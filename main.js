const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow
//const fixPath = require('fix-path');
const pm2 = require('pm2');
const path = require('path')
const url = require('url')
const exec = require('child_process').exec;

fs = require('fs');

let mainWindow
//process.env.ELECTRON_RUN_AS_NODE = true;

function createWindow () { //not being called
//fixPath();
//process.env.ELECTRON_RUN_AS_NODE = true
  //console.log(process.env);

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


}

app.on('ready', launchPM2); //only pm2 shall be launched

/*
var fpath = path.join(__dirname, '/node_modules/pm2/bin/pm2');
const child = execFile(fpath, ['list'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});
*/

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function launchPM2() {

  var fpath = path.join(__dirname, '/node_modules/pm2/bin/pm2 list');
  exec(fpath, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

  /*
  pm2.connect(function(err) { //start up pm2 god
    if (err) {
      console.log(err);
      process.exit(2);
    }
  });
  */
  console.log("pm2 launched...");
  //process.exit(2);
}
