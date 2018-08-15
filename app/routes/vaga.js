module.exports = (app) => {
    var api = app.api.vagas;

    api.methods(['get']);
    api.register(app, '/vaga');
}