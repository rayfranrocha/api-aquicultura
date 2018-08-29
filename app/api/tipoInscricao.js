var restful = require('node-restful');
var mongoose = require('mongoose');

var schema = mongoose.model('TipoInscricao').schema;

module.exports = (app) => {
    return restful.model('TipoInscricao', schema);
}