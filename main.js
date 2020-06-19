const { app, BrowserWindow, Menu, Tray, clipboard } = require('electron')

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./assets/IconTemplate.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Zoom Clipboard', click() {
        openZoomClipboard();
      } },
      { label: 'Zoom Personal', click() {
        openZoomPersonal();
      }},
      { type: 'separator'},
      {label:'Quit ZoomMenu', click() {
        app.quit();
      }}
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
  })

function openZoomPersonal() {
  openZoom();
}

function openZoomClipboard() {
  var clipText = clipboard.readText();
  console.log("P: "+clipText);
  //this one works if there is a password
  //var success = testURLpassword(clipText);
  //this one works for now password
  var success = testURL(clipText);
  if (success) openZoom(success);
}

function openZoom(confno) {
  var execString;
  if (confno) {
    var execString = 'open \"zoommtg://zoom.us/join?action=join&confno='+confno+'\"';
  } else {
    var execString = 'open \"zoommtg://zoom.us/join?action=start\"';
  }
  console.log("execString:"+execString);
  var exec = require('child_process').exec;
  exec(execString);
}

//Just a Meeting ID
// 9 - 11 digits, perhaps with spaces between.

function testURL(str) {
  const regex = /zoom\.us\/j\/(\d{9,11})(?!\d)/;
  const found = regex.exec(str)
  if (found.length == 2) return found[1];
}

//https://zoom.us/j/95486480498?pwd=NDM1YWlYL0xNTG9uZ053V2t1VmJHUT09
//This works for the string above.  It does not have checks, however.
// and it needs to be refactored because I killed the testURL one.
function testURLpassword(str) {
  const regex = /zoom\.us\/j\/(\d{9,11})(?!\d)\?pwd=(\w*)/;
  const found = regex.exec(str)
  if (found.length !=3) return null;
  var execString = 'open \"zoommtg://zoom.us/join?action=join&confno='+found[1]+'&pwd='+found[2]+'\"';
  console.log("execString:"+execString);
  var exec = require('child_process').exec;
  exec(execString);
  return null;
}
