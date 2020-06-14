const { app, BrowserWindow, Menu, Tray } = require('electron')

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./assets/IconTemplate.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Zoom Personal', click() {
        openZoomPersonal();
      }},
      { label: 'Zoom Clipboard', click() {
        openZoomClipboard();
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
  openZoom(6283930936);
}

function openZoomClipboard() {
  console.log("P");
}

function openZoom(confno) {
  var execString = 'open \"zoommtg://zoom.us/join?action=start&confno='+confno+'\"';
  console.log("execString:"+execString);
  var exec = require('child_process').exec;
  exec(execString);
}
