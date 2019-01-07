const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteOne({text: 'hello 2'}).then((docs) => {
//     console.log(docs);
// });
// Todo.deleteMany({
//     text: 'hello 1'
// }).then((docs) => {
//     console.log(docs);
// });

// Todo.findOneAndDelete({_id: '5c30da091ab89c2fd81488aa'}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndDelete('5c32d5c872c355aad909ed0a').then((todo) => {
//     console.log(todo);
// });