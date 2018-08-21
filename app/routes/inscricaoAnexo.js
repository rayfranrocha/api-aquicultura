const mongoose = require('mongoose');
const InscricaoAnexo = mongoose.model('InscricaoAnexo');

module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get']);
    api.register(app, '/inscricaoAnexo');
    
    api.before('get', (req, res, nex) => {
        let param = req.params.idEformato;
        const [id, formato] = param.split('.');

        if (formato === 'pdf') {
            InscricaoAnexo.findOne({inscricao: id})
            .then(anexo => {
                if (!anexo) {
                    res.status(404).send('Not found');
                } else {
                    res.contentType('application/pdf');
                    res.send(anexo.file);
                }
            });
        } else {
            next();
        }

    });
    

}