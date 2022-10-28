const { app, BrowserWindow, ipcMain } = require('electron')

// const { items } = require('./items')
const db = require('./database')
const auth = require('./auth')
const tokenAuth = require('./rest/tokenAuth')
const dbMysql = require('./rest/db-mysql')

function createWindow() {
    let win = new BrowserWindow({
        width: 1300,
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

    auth.winRegister(win.id)
    auth.winLogin(win.id)

    win.webContents.on('did-finish-load', () => {
        // win.webContents.send('pr-items', items)
        db.item_all()
    })

    // ipcMain.on('pp-get-token',(event,data) =>{
    //     win.webContents.send('pr-get-token',tokenAuth.getAuth())
    // })

    ipcMain.on('pp-win-logout', (event,data)=> {
        console.log('logout')
        dbMysql.logout(tokenAuth.getAuth())
        tokenAuth.setAuth('')
    })

    ipcMain.on('pp-get-token-user', (event, data) => {
        const token = tokenAuth.getAuth()

        if (token == '')
            return win.webContents.send('pr-get-token-user', {
                login: false,
                user: null
            })

        dbMysql.getUserToken(token, (data) => {

            if (data.id) {
                win.webContents.send('pr-get-token-user', {
                    login: true,
                    user: data,
                    token: token
                })
            }
            else {
                tokenAuth.setAuth('')
                win.webContents.send('pr-get-token-user', {
                    login: false,
                    user: null
                })
            }
        })
    })

    // console.log(`file://${__dirname}/vue/index.html`)

    db.create_db()

    win.webContents.openDevTools()


}

app.whenReady().then(createWindow)