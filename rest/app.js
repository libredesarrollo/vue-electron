const express = require('express')

const db = require('electron-db')
const cors = require('cors')

const dbMySQL = require('./db-mysql')

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

const corsOptions = {
    origin: 'http://localhost:8080' // http://example.com
}

app.get('/task',cors(corsOptions),function(req,res){
    dbMySQL.getTasks((items)=>{
        res.json(items)
    })
    // db.getAll('todos', (succ, items) => {
    //     res.json(items)
    // })
})

app.post('/task',function(req,res){
    
    // console.log(req.body)
    // console.log(req.body.task)

    let item = new Object()
    item.name = req.body.task

    dbMySQL.insertTask(item,(data)=>{
        res.json(data)
    })

    // db.insertTableContent('todos', item, (succ, msg) => {
    //     console.log(succ)
    //     console.log(msg)
    // })

    // res.json('ok')
    
})
app.put('/task/:id/',function(req,res){
    
    console.log(req.body)
    console.log(req.body.task)
    console.log(req.params.id)


 

    let item = new Object()
    item.name = req.body.task

    dbMySQL.updateTask(req.params.id, item, (data)=>{
        res.json(data)
    })


    // const where = {
    //     "id": parseInt(req.params.id)
    // }
    // db.updateRow('todos', where, item, (succ, msg) => {
    //     console.log(succ)
    //     console.log(msg)
    // })
    
    // res.json('ok')
})

app.delete('/task/:id/',function(req,res){

    dbMySQL.deleteTask(req.params.id, (data)=>{
        res.json(data)
    })

    // db.deleteRow('todos', { 'id':parseInt(req.params.id) }, (succ, msg) => {
    //     console.log(succ)
    //     console.log(msg)
    // })
    // res.json('ok')

})

app.listen(3000, function(){
    console.log('EXPRESS INIT!')
})