var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');
console.log('mongodb cnnect');
var schema = new mongoose.Schema({
    name:String,
    path:String
});

module.exports = mongoose.model('Photo', schema);
console.log('mongodb exports');