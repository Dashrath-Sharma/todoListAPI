const express = require('express');
const app = express();
app.use(express.json())

const port = process.env.PORT || 3000

const list = [
    {
        id:1,
        name:"Dashrath",
        age:"23",
        email:"dashrath@gmail.com"
    },
    {
        id:2,
        name:"Vishal",
        age:"24",
        email:"Vishal@gmail.com"
    },
    {
        id:3,
        name:"Sachin",
        age:"44",
        email:"Sachin@gmail.com"
    },
    {
        id:4,
        name:"Rajender",
        age:"24",
        email:"Rajender@gmail.com"
    },
    {
        id:5,
        name:"pradeep",
        age:"24",
        email:"pradeep@gmail.com"
    },
]

//get all users
app.get('/api/v1/users', (req, res) => {
    res.send(list)
})

//get single user
app.get('/api/v1/users/:id', (req, res) => {
    const task = list.find(item => item.id == req.params.id)
    res.send(task)
})

//Add a new User
app.post('/api/v1/users/add', (req, res) => {
    const newCourse = {
        id:list.length+1,
        name:req.body.name,
        age:Math.floor(Math.random() * 50) + 10,
        email:`${req.body.name}@gmail.com`
    }
    list.push(newCourse)
    res.send(list)
})

//Update a user
app.put('/api/v1/users/update', (req, res) => {
    if(!req.body.id) return res.status(400).send("Missing ID!")
    const index = list.find(n => n.id === parseInt(req.body.id))
    if(!index) return res.status(400).send("ID doesn't exist")
    index.name = req.body.name ? req.body.name : index.name
    index.age = req.body.age ? req.body.age : index.age
    index.email = req.body.email ? req.body.email : index.email
    res.send(index)
})

//Delete a user
app.delete('/api/v1/users/delete/:id',(req, res) => {
    if(!req.params.id) return res.status(400).send("Missing ID")
    const index = list.find(n => n.id === parseInt(req.params.id))
    res.send(last)
})

app.listen(port, console.log(`server running on PORT ${port}`))