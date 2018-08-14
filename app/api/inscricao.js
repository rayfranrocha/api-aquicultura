var restful = require('node-restful');
var mongoose = require('mongoose');

var Inscricao = mongoose.model('Inscricao')
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

    return api;
}