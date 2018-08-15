var restful = require('node-restful');
var mongoose = require('mongoose');

var schema = mongoose.model('Trabalho').schema;

module.exports = (app) => {
    return restful.model('Trabalho', schema);
}