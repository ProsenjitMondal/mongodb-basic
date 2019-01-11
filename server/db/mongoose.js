var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    process.env.PORT = 3000;
    var MONGOGB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test') {
    process.env.PORT = 3000;
    var MONGOGB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else if(env === 'production') {
    var MONGOGB_URI = 'mongodb://prosenjit:prosenjit007@ds149744.mlab.com:49744/db_node_heroku';
}

mongoose.connect(MONGOGB_URI, {useCreateIndex: true, useNewUrlParser: true});

module.exports = {
    mongoose
}