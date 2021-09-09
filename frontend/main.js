const electron = require('electron');
const home = electron.app;
const janela = electron.BrowserWindow;
const shell = electron.shell;

home.on('ready', function () {
  let janelaPrincipal = new janela({
    backgroundColor: '#fff',
    width: 1280,
    height: 720,
    alwaysOnTop: false,
    show: false,
    title: 'Power Motor',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      nodeIntegrationInSubFrames: true
    }
  });
  //janelaPrincipal.on('close', () =>{janelaPrincipal=null; shell.openPath("C://powermotor-x64//executaveis_modulos//close.vbs");})
  janelaPrincipal.loadURL(`file://${__dirname}/index.html`);
  janelaPrincipal.once('ready-to-show', () => {
    janelaPrincipal.show();
    janelaPrincipal.maximize();
  });

  //shell.openPath("C://powermotor-x64//executaveis_modulos//startMongo.vbs")
  //shell.openPath("C://powermotor-x64//executaveis_modulos//startNode.vbs")
  //shell.openPath("C://powermotor-x64//executaveis_modulos//startBackup.vbs")

  if(new Date().getDate() == 5){
    //shell.openPath("C://powermotor-x64//executaveis_modulos//deleteBackup.vbs")
  }

});
