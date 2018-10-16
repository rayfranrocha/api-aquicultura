const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
    var controller = app.api.auth;
    const emailUtil = app.utils.email;

    app.post('/auth', controller.auth);

    app.post('/user/recuperarSenha', function (req, res) {
        const payload = req.body;

        if (!payload.cpf) {
            res.status(400).json({mensage: 'CPF é obrigatório'});
            return false;
        }

        payload.cpf = payload.cpf.replace(/[-.]/ig, '');

        User.findOne({cpf: payload.cpf})
            .then(user => {
                if (!user) {
                    res.status(404).json({mensage: 'Usuário nao encontrado'});
                    return false;
                }

                // altera a senha do usuario
                user.senha = Math.random().toString(36).slice(-6);
                user.save();

                emailUtil.sendEmail(user);
                res.status(200).json({mensage: 'Email enviado com sucesso'});
            })
            .catch(err => {
                res.status(500).json({mensage: 'Falha ao enviar email'});
            });
    });
}