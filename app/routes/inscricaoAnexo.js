module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get']);
    api.register(app, '/inscricaoAnexo');
}