// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err) {
        return console.log('Unable to connect to Mongodb server', err);
    }

    console.log('Connected to Mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     // _id: new ObjectID('5c24b1066969eeaa700d2d61')
    //     _id: new ObjectID('5c245ebfaa6c7d128c55abf3')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos.', err);
    // });

    db.collection('Users').find({
        name: 'Prosenjit'
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to count todos', err);
    });

    // client.close();
})