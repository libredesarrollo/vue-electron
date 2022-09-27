const { app, BrowserWindow } = require('electron')

// const { items } = require('./items')
const  db  = require('./database')

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // win.webContents.loadURL('https://www.google.com/')
    if (process.env.DEBUG)
        // win.webContents.loadURL(`file://${__dirname}/vue/index.html`)
        win.webContents.loadURL('http://localhost:8080/')
    else
        win.webContents.loadURL(`file:///Users/andrescruz/Desktop/proyects/electron/curso/vueelectron/vue/index.html`)
    // win.webContents.loadURL('https://www.google.com/')

    win.webContents.on('did-finish-load', () => {
        // win.webContents.send('pr-items', items)
        db.item_all()
    })

    // console.log(`file://${__dirname}/vue/index.html`)

    db.create_db()

    win.webContents.openDevTools()


}

app.whenReady().then(createWindow)