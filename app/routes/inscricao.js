 const mongoose = require('mongoose');

 const Vaga = mongoose.model('Vaga');

module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get', 'post', 'put', 'delete']);

    async function validaVagas (req, res, next) {
        const inscricao = req.body;

        const minicurso1 = inscricao.minicurso;
        const minicurso2 = inscricao.minicurso2;

        const messages = [];

        if (minicurso1) {
            const vaga1 = await Vaga.findById(minicurso1._id);
            if (vaga1 && vaga1.disponiveis === 0) {
                messages.push({'tipo': 'Minicurso 1', 'descricao': 'O Minicurso selecionado preencheu todas as vagas'});
            }
        }

        if (minicurso2) {
            const vaga2 = await Vaga.findById(minicurso2._id);
            if (vaga2 && vaga2.disponiveis === 0) {
                messages.push({'tipo': 'Minicurso 2', 'descricao': 'O Minicurso selecionado preencheu todas as vagas'});
            }
        }

        if (messages.length === 0) {
            next();
        } else {
            res.status(400).json(messages);
        }
    }

    api.before('post', validaVagas);

    api.register(app, '/inscricao');
}