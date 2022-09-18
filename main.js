const { app, BrowserWindow } = require('electron')

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // win.webContents.loadURL('https://www.google.com/')
    if (process.env.DEBUG)
        // win.webContents.loadURL(`file://${__dirname}/vue/index.html`)
        win.webContents.loadURL('http://localhost:8080/')
    else
        win.webContents.loadURL(`file:///Users/andrescruz/Desktop/proyects/electron/curso/vueelectron/vue/index.html`)
        // win.webContents.loadURL('https://www.google.com/')

        console.log(`file://${__dirname}/vue/index.html`)

    win.webContents.openDevTools()

    console.log()

}

app.whenReady().then(createWindow)