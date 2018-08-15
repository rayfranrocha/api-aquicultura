var mongoose = require('mongoose');

var trabalho = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    titulo: String,
    autores: String,
    emailAutores: String,
    resumo: String,
    abstract: String,
    status: {type: String, default: 'Em análise'}
}, {
    timestamps: true
});

mongoose.model('Trabalho', trabalho);