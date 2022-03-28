module.exports = function (app, router) {
    app.use('/profile', require('./profile.js')(router));
    app.use('/profile/:id', require('./profile.js')(router));
};