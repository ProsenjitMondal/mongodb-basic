var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Heroku Mlab');
});

app.post('/user', (req, res) => {
    var newUser = new User({
        email: req.body.email
    });

    newUser.save().then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }, (e) => {
        res.status(404).send(e);
    });
});

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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};

