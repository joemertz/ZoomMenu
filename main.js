const { app, BrowserWindow, Menu, Tray } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
              {label:'Zoom Personal', click() {
                console.log('P');
              }},
              {label:'Zoom Clipboard', click() {
                console.log('C');
              }},
              {type:'separator'},
              {label:'Quit ZoomMenu', click() {
                app.quit();
              }}
          ]
      }
  ])
  Menu.setApplicationMenu(menu);

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./assets/IconTemplate.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
  })
