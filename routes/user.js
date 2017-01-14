var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
        }

        if (users) {
            res.render('user/user', {
                session: req.session,
                users: users
            });
        }
    });
});

module.exports = router;
