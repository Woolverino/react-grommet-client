const electron = require('electron');
const {app, BrowserWindow} = electron;
const {setupMainHandler} = require('eiphop');
var lsn = require('./lsn.js');
const x2js = require('xml2js');

const pingActions = {  
  ping: (req, res) => {  
    const {payload} = req;  
    res.send({msg: 'pong-' + Date()});  
    // or res.error({msg: 'failed'})
  }  
};

const requestActions = {
  lsnRequest: async (req, res) => {  
    const {payload} = req;
    const result = await lsn.lsn_get_request(req.payload.request + '\n',req.payload.port,req.payload.host);
    var resultJSON = "";
    x2js.parseString(result, (error,result) => {
      resultJSON=result
    })
    res.send({result: resultJSON });  
    // or res.error({msg: 'failed'})
  }  
}

setupMainHandler(electron, {...pingActions, ...requestActions}, true);

let win;
function createWindow () {
  win = new BrowserWindow({
    width: 800, height: 600, transparent: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js' // <--- (1) Preload script
  }});
win.loadURL('http://localhost:3000'); // <--- (2) Loading react
  
win.webContents.openDevTools();

win.on('closed', () => {  
    win = null
  });
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    
    createWindow()
  }
})