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
        }
    };
}