var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // var todo = new Todo({
    //     text: req.body.text
    // });

    // todo.save().then((doc) => {
    //     res.send(doc);
    // }, (e) => {
    //     res.status(400).send(e);
    // });

    var otherTodo = new Todo({
        text: req.body.text
    });
    otherTodo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send('ID is not valid!');
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('Todo not found!');
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send('Something went wrong');
    });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});

module.exports = {app};