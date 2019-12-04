/**
 * Creates the desktop app to contain the pake described in 
 * DAC_Calc.html
 * 
 * Written by Haden Santefort for ECE 4900 Capstone
 * 
 * Group # 10
 * 
 * Haden Santefort, Matt Daehn, Tamir Yankevich, 
 * Clayton Wise, Locke Wang
 */

const { app, BrowserWindow } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        width: 450,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('DAC_Calc.html');
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
