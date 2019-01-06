var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbURI = 'mongodb://Prosenjit:Pr@senjeet007@ds149744.mlab.com:49744/db_node_heroku';
mongoose.connect(dbURI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

module.exports = {
    mongoose
}