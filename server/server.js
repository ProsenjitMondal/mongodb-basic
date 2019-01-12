const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Heroku Mlab');
});

// app.post('/user', (req, res) => {
//     var newUser = new User({
//         email: req.body.email
//     });

//     newUser.save().then((user) => {
//         res.send(user);
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

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
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ID is not valid!');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Todo not found!');
        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send('Something went wrong');
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({
            todo
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({
            todo
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token)=> {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};