const { BrowserWindow, ipcMain } = require('electron')

const dbMysql = require('./rest/db-mysql')
const tokenAuth = require('./rest/tokenAuth')

module.exports.winRegister = function (primaryWinId) {
    let win;

    const primaryWin = BrowserWindow.fromId(primaryWinId)

    ipcMain.on('pp-win-register', (event, data) => {

        win = new BrowserWindow(
            {
                width: 1300,
                height: 600,
                parent:primaryWin,
                modal:true,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            }
        )

        win.loadURL('http://localhost:8080/user/register')

        win.openDevTools()

    })

    ipcMain.on('pp-close-win-register', (event, data) => {
        win.close()
    })

}
module.exports.winLogin = function (primaryWinId) {
    let win;

    const primaryWin = BrowserWindow.fromId(primaryWinId)

    ipcMain.on('pp-win-login', (event, data) => {
        win = new BrowserWindow(
            {
                width: 1300,
                height: 600,
                parent: primaryWin,
                modal:true,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            }
        )

        win.loadURL('http://localhost:8080/user/login')

        win.openDevTools()

    })

    ipcMain.on('pp-close-win-login', (event, data) => {
        win.close()


        const token = tokenAuth.getAuth()
        dbMysql.getUserToken(token, (data) => {
            primaryWin.webContents.send('pr-get-token-user', {
                login: true,
                user: data,
                token: token
            })
        })


    })

}