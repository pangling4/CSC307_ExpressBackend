const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
    users_list :
    []
 } 

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined){
        let result = findUserByNameANDid(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByNameANDJob = (name, job) => { 
    return users['users_list'].filter( ((user) => user['name'] === name) && ((user) => user['job'] === job)); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res)=>{
    const id = req.params['id'];
    let index = findUserIndexById(id);
    if (index == -1)
        res.status(410).send('User id was not found. Could not delete.');
    else {
        deleteUser(index);
        res.status(200).end();
    }
});

function findUserIndexById(id) {
    return users['users_list'].findIndex( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function deleteUser(index){
    users['users_list'].splice(index, 1);
}