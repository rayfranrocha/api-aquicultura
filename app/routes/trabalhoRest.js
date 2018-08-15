module.exports = (app) => {
    var api = app.api.trabalhoRest;

    api.methods(['get']);
    api.register(app, '/trabalhoRest');
}