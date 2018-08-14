var restful = require('node-restful');
var mongoose = require('mongoose');

var schema = mongoose.model('InscricaoAnexo').schema;

module.exports = (app) => {
    return restful.model('InscricaoAnexo', schema);
}