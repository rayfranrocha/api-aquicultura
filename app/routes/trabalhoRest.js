module.exports = (app) => {
    var api = app.api.trabalhoRest;

    api.methods(['get', 'put']);
    api.register(app, '/trabalhoRest');
}