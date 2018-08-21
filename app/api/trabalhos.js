const mongoose = require('mongoose');

const Trabalho = mongoose.model('Trabalho');
const TrabalhoAnexo = mongoose.model('TrabalhoAnexo');

module.exports = function (app) {
    return api = {
        save: (req, res) => {
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