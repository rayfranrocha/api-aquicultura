module.exports = (app) => {
    var controller = app.api.trabalhos;

    app.post('/trabalho', controller.save);
    app.get('/trabalhoAnexo/:idEformato', controller.getAnexo);
}