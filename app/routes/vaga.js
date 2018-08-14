module.exports = (app) => {
    var api = app.api.user;

    api.methods(['get']);
    api.register(app, '/vaga');
}