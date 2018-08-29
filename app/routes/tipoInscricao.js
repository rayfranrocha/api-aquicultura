module.exports = (app) => {
    var api = app.api.tipoInscricao;

    api.methods(['get', 'post']);
    api.register(app, '/tipoInscricao');
}