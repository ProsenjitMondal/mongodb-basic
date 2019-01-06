var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var port = process.env.PORT || 3000;
if(port !== 3000) {
    var MONGOGB_URI = 'mongodb://prosenjit:prosenjit007@ds149744.mlab.com:49744/db_node_heroku';
}else{
    var MONGOGB_URI = 'mongodb://localhost:27017/TodoApp';
}

mongoose.connect(MONGOGB_URI, {useNewUrlParser: true});

module.exports = {
    mongoose
}