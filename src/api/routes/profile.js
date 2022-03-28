let Profile = require('../models/profileModel');

module.exports = function (router) {
    // /users GET
    router.get('/profile', (req, res) => {

        console.log('t')
        Profile.find().then(doc => {
            return res.status(200).send(doc);
        })
    });

    return router;
}
