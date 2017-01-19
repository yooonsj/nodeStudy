var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var User = mongoose.Schema({
	email: {type: String, required: true, unique: true},
    nickname: {type: String, required: true},
	password: {type: String, required: true},
	reg_date: {type: Date, default: Date.now}
});

User.pre('save', function(next) {
    var user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password, function(err, isMatch) {
        return isMatch;
    });
};

module.exports = mongoose.model('User', User, 'user');
