const { app, BrowserWindow, Menu, Tray, clipboard } = require('electron')

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./assets/IconTemplate.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Zoom Clipboard', click() {
        parseClipboard();
      } },
      { label: 'Zoom Personal', click() {
        openZoom();
      }},
      { type: 'separator'},
      {label:'Quit ZoomMenu', click() {
        app.quit();
      }}
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
  })

// Parse the clipboard to find a Meeting ID (id) and a Password (pwd)
function parseClipboard() {
  var id, pwd = null;

  var clipText = clipboard.readText();
  console.log("Clipboard:  "+clipText);

  // ID only
  if (Number.isInteger(clipText)) {
    openZoom(clipText);
    return;
  }

  // ID and PWD already formatted in a URL
  var regex = /zoom\.us\/j\/(\d{9,11})(?!\d)\?pwd=(\w*)/;
  var found = regex.exec(clipText)
  if (found && found.length == 3) {
    openZoom(found[1], found[2]);
    return;
  }

  // ID only in URL
  regex = /zoom\.us\/j\/(\d{9,11})(?!\d)/;
  found = regex.exec(clipText)
  if (found && found.length == 2) {
    id = found[1];
  } else {

    // Meeting ID: xxx xxxx xxxx
    regex = /Meeting ID:\s*(\d*)\s*(\d*)\s*(\d*)/;
    found = regex.exec(clipText)
    if (found && found.length == 4) {
      id = found[1] + found[2] + found[3];
    } else {
      console.log("No Zoom meeting ID found")
      return;
      }
  }

  // We have an ID, look for a PWD
  // Password: xxxxxx
  regex = /Password:\s(\d*)/;
  found = regex.exec(clipText);
  if (found && found.length == 2) {
    openZoom(id, found[1]);
  } else {
    openZoom(id);
  }
}

function openZoom(id, pwd) {
  var execString = 'open \"zoommtg://zoom.us/'
  if (!id) {
    execString += 'join?action=start';
  } else {
    execString += 'action=join&confno='+id;
    if (pwd) {
      execString += '&pwd='+pwd;
    }
  }
  execString +='\"'
  console.log(execString);

  // launch Zoom
  //var exec = require('child_process').exec;
  //exec(execString);

}
