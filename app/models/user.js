var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    cpf: {type: String, unique: true},
    admin: {type: Boolean, default: false}
}, {
    timestamps: true
});

mongoose.model('User', userSchema);