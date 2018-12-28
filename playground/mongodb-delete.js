// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) =>{
    if(err) {
        return console.log('Unable to connect to Mongodb server', err);
    }

    console.log('Connected to Mongodb server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Walking the dog'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete the todos', err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete the todo', err);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to find and delete the todo');
    // });

    // db.collection('Users').deleteMany({name: 'Prosenjit'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5c25bef16969eeaa700d4162")}).then((result) => {
        console.log(result);
    });

    // client.close();
})