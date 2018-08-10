module.exports = (app) => {
    var api = app.api.user;

    api.methods(['get', 'post', 'put']);
    api.register(app, '/usuario');
}