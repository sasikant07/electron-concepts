console.log('Main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

let win;

function createWindow() {
    win = new BrowserWindow({
		webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
	});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    })
}

ipc.on('open-error-dialog', function (event) {
    dialog.showErrorBox('Ann error message', 'Demo of an error message');
    event.sender.send('opened-error-dialog', 'Main process opened the error dialog')
});

app.on('ready', createWindow);

// for MAC OS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
