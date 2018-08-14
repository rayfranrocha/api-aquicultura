var restful = require('node-restful');
var mongoose = require('mongoose');

var schema = mongoose.model('Vaga').schema;

module.exports = (app) => {
    return restful.model('Vaga', schema);
}