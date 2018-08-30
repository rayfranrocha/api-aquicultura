module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get', 'post', 'put', 'delete']);
    api.register(app, '/inscricao');
}