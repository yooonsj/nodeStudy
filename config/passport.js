var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    //serializer와 deseriazlier는 필수로 구현해야 함.
    passport.serializeUser(function(user, done) {
        console.log('serializeUser');
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log(user);
        done(null, user);
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            User.findOne({email: email}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('msg', 'Incorrect username.'));
                }
                if (user.validPassword(password)) {
                    return done(null, false, req.flash('msg', 'Incorrect password.'));
                }

                return done(null, user);
            });
        }
    ));
};
