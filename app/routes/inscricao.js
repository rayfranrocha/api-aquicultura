module.exports = (app) => {
    var api = app.api.inscricao;

    api.methods(['get', 'post', 'put']);
    api.register(app, '/inscricao');
}