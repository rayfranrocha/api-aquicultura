var nodemailer = require('nodemailer');
const user = 'aquiculturaamazonia@gmail.com';
const pwd = 'ppgaqui2018';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass: pwd
    }
});
// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
         console.log('Error', error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

module.exports = function (app) {
    return api = {
        sendEmail: (user) => {
            const mailOptions = {
                from: 'contato@aquiculturanaamazonia.com.br',
                to: user.email,
                subject: 'Aquicultura na Amazonia - Recuperar senha',
                html: `<p>Sua nova senha é: <b>${user.senha}</b></p>
                       <small> esse e-mail é automático e não deve ser respondido. Em caso de dúvidas, escreva para: <a href='mailto:aquicultura@niltonlins.br'>aquicultura@niltonlins.br</a></small>`
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if(err)
                    console.log(err)
                else
                    console.log(info);
            });
        }
    };
}