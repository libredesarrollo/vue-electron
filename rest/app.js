const express = require('express')

const db = require('electron-db')
const cors = require('cors')

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//CONF
app.use(cors())

app.get('/task',function(req,res){
    db.getAll('todos', (succ, items) => {
        res.json(items)
    })
})

app.post('/task',function(req,res){
    
    // console.log(req.body)
    // console.log(req.body.task)

    let item = new Object()
    item.name = req.body.task

    db.insertTableContent('todos', item, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })

    res.json('ok')
    
})
app.put('/task/:id/',function(req,res){
    
    console.log(req.body)
    console.log(req.body.task)
    console.log(req.params.id)


    const where = {
        "id": parseInt(req.params.id)
    }

    let item = new Object()
    item.name = req.body.task

    db.updateRow('todos', where, item, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })
    
    res.json('ok')
})

app.delete('/task/:id/',function(req,res){
    db.deleteRow('todos', { 'id':parseInt(req.params.id) }, (succ, msg) => {
        console.log(succ)
        console.log(msg)
    })
    res.json('ok')

})

app.listen(3000, function(){
    console.log('EXPRESS INIT!')
})