const express = require('express');
const app = express();
app.use(express.json())

const port = process.env.PORT || 3000

const list = [
    {
        id:1,
        name:"todo1",
    },
    {
        id:2,
        name:"todo2",
    },
    {
        id:3,
        name:"todo3",
    },
    {
        id:4,
        name:"todo4",
    },
    {
        id:5,
        name:"todo5",
    },
]

//get all users
app.get('/api/v1/tasks', (req, res) => {
    res.send(list)
})

//get single user
app.get('/api/v1/tasks/:id', (req, res) => {
    const task = list.find(item => item.id == req.params.id)
    res.send(task)
})

//Add a new User
app.post('/api/v1/tasks/add', (req, res) => {
    const newCourse = {
        id:list.length+1,
        name:req.body.name
    }
    list.push(newCourse)
    res.send(list)
})

//Update a user
app.put('/api/v1/tasks/update', (req, res) => {
    if(!req.body.id) return res.status(400).send("Missing ID!")
    const index = list.find(n => n.id === parseInt(req.body.id))
    if(!index) return res.status(400).send("ID doesn't exist")
    index.name = req.body.name ? req.body.name : index.name
    res.send(index)
})

//Delete a user
app.delete('/api/v1/tasks/delete/:id',(req, res) => {
    if(!req.params.id) return res.status(400).send("Missing ID")
    const index = list.find(n => n.id === parseInt(req.params.id))
    res.send(index)
})

app.listen(port, console.log(`server running on PORT ${port}`))