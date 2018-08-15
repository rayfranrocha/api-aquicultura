const http = require('axios');
const mongoose = require('mongoose');
const { URLSearchParams } = require('url');
const parseString = require('xml2js').parseString;
var Inscricao = mongoose.model('Inscricao')

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
                params.append('senderEmail', 'silas@sandbox.pagseguro.com.br');
                params.append('timeout', '25');
                params.append('enableRecovery', "false");
                params.append('acceptPaymentMethodGroup', 'CREDIT_CARD');
        
                http.post('https://ws.pagseguro.uol.com.br/v2/checkout?email=pgusmao1@yahoo.com.br&token=AFD3189DDE3A4D83979A591517B78670',
                    params.toString(),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
}