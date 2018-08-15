var mongoose = require('mongoose');

var trabalhoAnexo = mongoose.Schema({
    trabalho: {type: mongoose.Schema.Types.ObjectId, ref: 'Trabalho', required: true},
    file: Buffer,
    cotentType: String
}, {
    timestamps: true
});

mongoose.model('TrabalhoAnexo', trabalhoAnexo);