// const { app, BrowserWindow } = require('electron')
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 970,
    height: 740,
    icon: path.join(__dirname, 'assets', 'OvidWriterIcon.icns'), // Adjust the path accordingly
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })

  app.dock.setBadge("Ovid Writer");
  app.dock.setIcon(path.join(__dirname, 'assets', 'OvidWriterIcon.icns'));

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})