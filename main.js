const { app, BrowserWindow, Menu, Tray } = require('electron')

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./assets/IconTemplate.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Zoom Personal', click() {
        openZoomPersonal();
      }},
      { label: 'Zoom Clipboard', click() {
        console.log('C');
      } },
      { type: 'separator'},
      {label:'Quit ZoomMenu', click() {
        app.quit();
      }}
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
  })

function openZoomPersonal() {
  var exec = require('child_process').exec;
  exec('open "zoommtg://zoom.us/join?action=start&confno=6283930936"');
}
