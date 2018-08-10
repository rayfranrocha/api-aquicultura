var restful = require('node-restful');
var mongoose = require('mongoose');

var schema = mongoose.model('User').schema;

module.exports = (app) => {
    return restful.model('User', schema);
}