const db = require('electron-db')
const { ipcMain, BrowserWindow } = require('electron')

//*** EVENTOS CRUD */
// ipcMain.on('pp-item-create', (event, task) => {
//     items.push(task.task)
//     win.webContents.send('pr-items', items)
// })
// ipcMain.on('pp-item-edit', (event, task) => {
//     items[task.indexEdit] = task.task
//     win.webContents.send('pr-items', items)
// })
// ipcMain.on('pp-item-delete', (event, index) => {
//     items.splice(index, 1);
//     win.webContents.send('pr-items', items)
// })
//*** EVENTOS CRUD ELECTRON DB*/
ipcMain.on('pp-item-create', (event, task) => {
    if (task.task.trim() !== '')
        this.item_save(task.task.trim())
    this.item_all()
})
ipcMain.on('pp-item-edit', (event, indexTask) => {
    if (indexTask.task.trim() !== '')
        this.item_edit(indexTask.indexEdit, indexTask.task.trim())
    this.item_all()
})

ipcMain.on('pp-item-delete', (event, id) => {
    this.item_delete(id)
    this.item_all()
})





module.exports.create_db = function () {
    db.createTable('todos', (succ, msg) => {
        console.log('Success ' + succ)
        console.log('Msg ' + msg)
    })
}

module.exports.item_all = function () {
    db.getAll('todos', (succ, items) => {
        const win = BrowserWindow.getFocusedWindow()
        console.log(items)
        win.webContents.send('pr-items', items)
    })
}
module.exports.item_save = function (name) {

    let item = new Object()
    item.name = name

    db.insertTableContent('todos', item, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })
}

module.exports.item_edit = function (id, name) {

    const where = {
        "id": id // id
    }

    let item = new Object()
    item.name = name

    db.updateRow('todos', where, item, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })
}

module.exports.item_delete = function (id) {

    db.deleteRow('todos', { 'id':id }, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })
}
