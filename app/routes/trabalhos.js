module.exports = (app) => {
    var controller = app.api.trabalhos;

    app.post('/trabalho', controller.save);
}