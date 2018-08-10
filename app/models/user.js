var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    cpf: String,
    cracha: Object,
    dadosRecibo: Object
}, {
    timestamps: true
});

mongoose.model('User', userSchema);