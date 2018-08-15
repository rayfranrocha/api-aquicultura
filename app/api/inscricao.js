var restful = require('node-restful');
var mongoose = require('mongoose');

var Inscricao = mongoose.model('Inscricao')
var InscricaoAnexo = mongoose.model('InscricaoAnexo');
var schema = Inscricao.schema;

module.exports = (app) => {
    var api = restful.model('Inscricao', schema);

    api.route('pagamento', {
        detail: true,
        handler: (req, res) => {
            Inscricao.findById(req.params.id)
                .then((inscricao) => {
                    inscricao.statusPagamento = 'EM_PROCESSAMENTO',
                    inscricao.token = '';
                });
        }
    });

    api.route('comprovante.post', {
        detail: true,
        handler: (req, res) => {
            let idInscricao = req.params.id;

            let file = req.files.file;
            if (!file) {
                return res.send(400).send('Sem arquivos para receber');
            }

            if (file.mimetype !== 'application/pdf') {
                return res.send(400).send('Formato do arquivo inválido');
            }

            let payload = {file: file.data, contentType: file.mimetype, inscricao: idInscricao};
            InscricaoAnexo.create(payload)
                .then(anexo => {
                    anexo.file = null;
                    res.status(201).json(anexo);
                })
                .catch(err => {
                    res.send(500).send('Server error');
                });

        }
    });

    return api;
}