require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connectDB = require('./config/db')



//? Parse Requests
app.use(bodyParser.json())

connectDB()

//? routes
app.use('/api/users', require('./routes/api/users'))

//? To check if your application is running
app.get('/', (req, res) => {
    res.json({message: "Welcome to our app"})
})

let users = []
let lastId = 0

//? Create a user
app.post('/users', (req, res) => {
    const user = req.body
    user.id =  ++lastId
    users.push(user)
    res.status(201).json(user)
})

//? Get all the users
app.get('/users', (req, res) => {
    res.json(users)
})

//? Get One User by Id
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((u) =>u.id === id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
    }
})

//? Update one user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updateUser = req.body
    const userIndex = users.findIndex((u) => u.id === id)
    if(userIndex == -1){
        res.status(404).json({message: "User not found"})
    }else{
        users[userIndex] = {...users[userIndex], ...updateUser}
        res.json(users[userIndex])
    }
})



//? Delete one user

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex((u) => u.id === id)
    if(userIndex == -1){
        res.status(404).json({message: "User not found"})
    }else{
        users.splice(userIndex, 1)
        res.json({message: "User is deleted"})
    }
})









const port = 3333
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})