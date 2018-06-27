// Modules to control application life and create native browser window
const {app, autoUpdater, ipcMain, BrowserWindow, net} = require('electron');
const http = require('http');
const fs = require('fs');
const dns = require('dns');
const shell = require('electron').shell;

// command line
const { exec } = require('child_process');



const isDev = require('electron-is-dev');

if (!isDev) {

  // console.log('Running in development');
  console.log('Running in production');

  const server = 'https://update.electronjs.org'
  const feed = `${server}/OWNER/REPO/${process.platform}/${app.getVersion()}`

  autoUpdater.setFeedURL(feed);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);

}



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `${__dirname}/public/img/core/icon.png`
  });

  // and load the index.html of the app.
  // mainWindow.loadFile('public/index.html');
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  // remove menu bar
  mainWindow.setMenu(null);

  // dev tools
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {

    app.quit();

  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

