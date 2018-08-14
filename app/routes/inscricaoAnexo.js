module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get', 'post']);
    api.register(app, '/inscricaoAnexo');
}