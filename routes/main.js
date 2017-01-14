var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
    res.render('main/main', {session: req.session});
});

router.get('/login', function(req, res) {
    res.render('', {view: 'login/login'});
});

router.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user, info) {
        if (err) {
            console.error(err);
        }

        if (!user) {
            res.send(req.flash('msg'));
        }

        req.logIn(user, function(err) {
            if (err) {
                console.error(err);
            }

            res.end();
        });
    })(req, res);
});

router.post('/join', function(req, res) {
    var param = req.body;
    var user = new User();
    user.email = param.email;
    user.nickname = param.nickname;
    user.password = param.password;

    user.save(function(err, user) {
        var msg = '';

    	if (err) {
    		console.error(err);
            msg = 'join fail';
		}

		res.send(msg).end();
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
