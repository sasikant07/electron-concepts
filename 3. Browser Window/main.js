console.log('Main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let win, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow() {
    /* win = new BrowserWindow();
    dimWindow = new BrowserWindow({
        width: 400, height: 400, maxWo
            : 600, maxHeight: 600
    });
    colorWindow = new BrowserWindow({ backgroundColor: '#228b22' });
    framelessWindow = new BrowserWindow({backgroundColor: '#800000', frame: false}) */
    
    parentWindow = new BrowserWindow({title: "Parent"});
    childWindow = new BrowserWindow({ show: false, parent: parentWindow, modal: true, title: 'Child' });
    //To open remote page
    childWindow.loadURL('https://github.com');
    childWindow.once('ready-to-show', () => {
        childWindow.show()
    })
}

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
