module.exports = (app) => {
    var controller = app.api.auth;

    app.post('/auth', controller.auth);
}