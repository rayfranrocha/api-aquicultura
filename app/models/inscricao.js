var mongoose = require('mongoose');

var inscricaoSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tipoCompra: {type: String},
    tipoInscricao: String,
    tipoInscricaoObj: Object,
    formaPagamento: String,
    minicurso: Object,
    dadosBoleto: Object,
    nomeCracha: String,
    empresa: String,
    sexo: String,
    enderecoRecibo: String,
    telefone: String,
    status: String,
    totalAPagar: Number,
    valorInscricao: Number,
    pagseguro: Object,
    transactionCode: String,
    statusPagseguro: Object,
    email: String
}, {
    timestamps: true
});

mongoose.model('Inscricao', inscricaoSchema);