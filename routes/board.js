var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('board/list', {
        session: req.session
    });
});

router.get('/read', function(req, res) {
    res.render('board/read', {
        session: req.session,
        subject: req.param('subject'),
        contents: req.param('contents')
    });
});

router.get('/write', function(req, res) {
    res.render('board/write', {
        session: req.session
    });
});

router.get('/update', function(req, res) {
    res.render('board/update', {
        session: req.session,
        subject: req.param('subject'),
        contents: req.param('contents')
    });
});

module.exports = router;
