const http = require('axios');
const mongoose = require('mongoose');
const { URLSearchParams } = require('url');
const parseString = require('xml2js').parseString;
var Inscricao = mongoose.model('Inscricao');
var Vaga = mongoose.model('Vaga');

const token = '27CFC95DBEEA4C5F8E0047736042745C';

module.exports = (app) => {
    app.post('/pagseguro', function (req, res) {
        
        let inscricao = req.body.id;

        Inscricao.findById(inscricao)
            .populate('user')
            .then(inscricao => {
                var params = new URLSearchParams();
                params.append('currency', 'BRL');
                params.append('itemId1', '0001');
                params.append('itemDescription1', 'Inscrição no evento/minicurso Aquicultura na Amazonia');
                params.append('itemAmount1', '1.00');// inscricao.totalAPagar.toFixed(2));
                params.append('itemQuantity1', "1");
                params.append('reference', '1');
                params.append('senderName', inscricao.dadosBoleto.nome);
                params.append('senderAreaCode', inscricao.telefone.substr(0,2));
                params.append('senderPhone', inscricao.telefone.substr(2));
                params.append('senderEmail', inscricao.user.email);
                params.append('timeout', '25');
                params.append('enableRecovery', "false");
                params.append('acceptPaymentMethodGroup', 'CREDIT_CARD');
        
                http.post(`https://ws.pagseguro.uol.com.br/v2/checkout?email=pgusmao1@yahoo.com.br&token=${token}`,
                    params.toString(),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1' } })
                    .then(response => {
                        let xml = response.data;
                        parseString(xml, (err, result) => {

                            inscricao.pagseguro = {
                                code: result.checkout.code[0],
                                dataHora: result.checkout.date[0]
                            }
                            inscricao.save();
                            
                            res.send(result);
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500);
                        let xml = error.response.data;
                        parseString(xml, (err, result) => {
                            res.send(result);
                        })
                    });
            });
    });

    app.post('/notificacao', function (req, res) {

        console.log('Recebendo a notificacao para tratar com o notificationCode', req.body);

        http.get(`https://ws.pagseguro.uol.com.br/v3/transactions/notifications/${req.body.notificationCode}?email=pgusmao1@yahoo.com.br&token=${token}`)
            .then(response => {
                parseString(response.data, (err, result) => {
                    
                    Inscricao.findOne({transactionCode: result.transaction.code[0]})
                    .then(inscricao => {
                        
                        if (!inscricao) {
                            console.log('Resposta Pagseguro nao encontrada',result);
                            res.status(500).send('Transaction code Not Found');
                        }
                        
                        inscricao.statusPagseguro = result;
                        inscricao.save();
    
                        var minicurso = inscricao.minicurso;
    
                        if (minicurso) {
    
                            Vaga.findOne({nome: minicurso.nome})
                                .then(vaga => {
                                    --vaga.disponiveis;
                                    vaga.save();
                                });
                        }
                        
                        res.send(inscricao);
                    });
                });
            });
        
    });
}