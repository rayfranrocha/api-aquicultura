var mongoose = require('mongoose');

var tipoInscricao = mongoose.Schema({
    nome: {type: String, required: true},
    precoAte21: {type: Number, required: true},
    precoApos21: {type: Number, required: true},
    precoLocal: {type: Number, required: true},
    comprovante: {type: Boolean, required: true, default: false}
}, {
    timestamps: true
});

mongoose.model('TipoInscricao', tipoInscricao);