const express = require('express');
const serverless = require('serverless-http');
const router = express.Router();
const app = express();
app.use(express.json());

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
router.get('/tasks', (req, res) => {
    res.send(list);
});

//get single user
router.get('/tasks/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('ID is required');
    const task = list.find(item => item.id == req.params.id);
    res.send(task);
});

//Add a new User
router.post('/tasks/add', (req, res) => {
    if(!req.body.name) return res.status(400).send("name is required.");
    const newTodo = {
        id:list.length+1,
        name:req.body.name
    }
    list.push(newTodo);
    res.send(list[list.length-1]);
});

//Update a user
router.put('/tasks/update', (req, res) => {
    if(!req.body.id) return res.status(400).send("Missing ID!");
    const index = list.find(n => n.id === parseInt(req.body.id));
    if(!index) return res.status(400).send("ID doesn't exist");
    index.name = req.body.name ? req.body.name : index.name;
    res.send(index);
});

//Delete a user
router.delete('/tasks/delete/:id',(req, res) => {
    if(!req.params.id) return res.status(400).send("Missing ID")
    const index = list.find(n => n.id === parseInt(req.params.id))
    res.send(index)
})

app.use('/api',router)
module.exports.handler = serverless(app)