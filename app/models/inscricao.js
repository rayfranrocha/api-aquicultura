var mongoose = require('mongoose');

var inscricaoSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tipoInscricao: String,
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
    valorTotalMinicurso: Number,
    minicursoGrupo3: Object,
    pagseguroMinicurso3: Object,
    transactionCodeMinicurso3: String,
    statusPagseguroMinicurso3: Object
}, {
    timestamps: true
});

mongoose.model('Inscricao', inscricaoSchema);