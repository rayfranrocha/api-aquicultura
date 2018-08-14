var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var secret = require('../../config/secret');

var Usuario = mongoose.model('User');

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

function getToken (user) {
    var expires = expiresIn(7); // 7 days

    var payload = {
      exp: expires,
      email: user.email,
      name: user.nome,
      id: user._id
    };

    var token = jwt.encode(payload, secret());
   console.log('User auth', user);
    return {
      token: token,
      expires: expires,
      email: user.email,
      nome: user.nome,
      cpf: user.cpf,
      id: user._id
    };
  }

module.exports = (app) => {
    return api = {
        auth: (req, res) => {
            var credentials = req.body;

            Usuario.findOne({cpf: credentials.cpf, senha: credentials.senha})
                .then((user) => {
                    if (!user) {
                        res.status(401).json({message: 'Usuário e ou senha inválidos'});
                    }

                    res.json(getToken(user));
                });

        }
    }; 
};