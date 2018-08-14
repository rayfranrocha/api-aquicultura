var mongoose = require('mongoose');

var inscricaoAnexoSchema = mongoose.Schema({
    inscricao: {type: mongoose.Schema.Types.ObjectId, ref: 'Inscricao', required: true},
    file: Buffer,
    cotentType: String
}, {
    timestamps: true
});

mongoose.model('InscricaoAnexo', inscricaoAnexoSchema);