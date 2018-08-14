const http = require('axios');
const { URLSearchParams } = require('url');

module.exports = (app) => {
    app.post('/pagseguro', function (req, res) {

        var params = new URLSearchParams()
        params.append('currency', 'BRL');
        params.append('itemId1', '0001');
        params.append('itemDescription1', 'Inscrição no evento Aquicultura na Amazonia');
        params.append('itemAmount1', '50.00');
        params.append('itemQuantity1', "1");
        params.append('reference', '1');
        params.append('senderName', 'Jose Comprador');
        params.append('senderAreaCode', '99');
        params.append('senderPhone', '99999999');
        params.append('senderEmail', 'silas@sandbox.pagseguro.com.br');
        params.append('timeout', '25');
        params.append('enableRecovery', "false");

        http.post('https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=pgusmao1@yahoo.com.br&token=A3A0B6BAEEC9476CB66AA586CAC5446B',
            params.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(response => {
                res.type('application/xml');
                res.json(response.data);
            })
            .catch(error => {
                res.status(500);
                res.type('application/xml');
                res.send(error.response.data);
            });
    });
}