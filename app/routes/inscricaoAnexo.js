const mongoose = require('mongoose');
const InscricaoAnexo = mongoose.model('InscricaoAnexo');

module.exports = (app) => {
    var api = app.api.inscricaoAnexo;
    app.get('/inscricaoAnexo/:idEformato', api.getAnexo);
}