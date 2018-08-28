var mongoose = require('mongoose');

var InscricaoAnexo = mongoose.model('InscricaoAnexo');

module.exports = (app) => {
    return api = {
        getAnexo: (req, res) => {
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
                res.status(404).send('Not found');
            }    
        }
    };
}