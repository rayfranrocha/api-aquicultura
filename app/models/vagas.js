var mongoose = require('mongoose');

var vagaSchema = mongoose.Schema({
    nome: String,
    total: Number,
    disponiveis: Number
}, {
    timestamps: true
});

mongoose.model('Vaga', vagaSchema);