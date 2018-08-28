const mongoose = require('mongoose');

const Trabalho = mongoose.model('Trabalho');
const TrabalhoAnexo = mongoose.model('TrabalhoAnexo');

const MAXIMO_TRABALHOS_POR_USUARIO = 2;

module.exports = function (app) {
    return api = {
        save: (req, res) => {
            // validar para até dois trabalhos por usuario
            Trabalho.find({user: req.body.user})
                .then(trabalhos => {
                    if (trabalhos.length === MAXIMO_TRABALHOS_POR_USUARIO) {
                        res.status(400).json({message: `É permitido apenas submeter ${MAXIMO_TRABALHOS_POR_USUARIO} trabalhos por cadastro!`});
                        return false;
                    }

                    Trabalho.create(req.body)
                        .then(trabalho => {
                            if (req.files && req.files.file) {
                                let file = req.files.file;
                                TrabalhoAnexo.create({file: file.data, contentType: file.mimetype, trabalho})
                                    .then(trabalhoAnexo => {
                                        res.status(201).json(trabalho);
                                    });
                            } else {
                                res.status(201).json(trabalho);
                            }
                        });
                });
        },
        getAnexo: (req, res) => {
            let param = req.params.idEformato;
            const [id, formato] = param.split('.');

            TrabalhoAnexo.findOne({trabalho: id})
                .then(trabalhoAnexo => {
                    if (!trabalhoAnexo) {
                        res.status(404).send('Not found');
                    } else {
                        res.contentType('application/pdf');
                        res.send(trabalhoAnexo.file);
                    }
                });
        }
    };
}