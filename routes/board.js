var express = require('express');
var Board = require('../models/board');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
    Board.find({}, function(err, list) {
        if (err) {
            console.error(err);
        }

        res.render('board/list', {
            list: list
        });
    });
});

router.get('/read/:numId', function(req, res) {
    Board.find({numId: req.params.numId}, function(err, docs) {
        res.render('board/read', {
            board: docs[0]
        });
    });
});

router.get('/write', function(req, res) {
    res.render('board/write', {
        session: req.session
    });
});

router.post('/write', function(req, res) {
    var param = req.body;
    var board = new Board();
    var user = new User();

    user.email = req.session.passport.user.email;

    board.title = param.title;
    board.body = param.body;
    board.author = user.email;

    board.save(function(err, board) {
        var msg = '';

    	if (err) {
    		console.error(err);
            msg = 'board write fail';
		}

		res.send(msg).end();
    });
});

router.get('/update/:numId', function(req, res) {
    Board.find({numId: req.params.numId}, function(err, docs) {
        res.render('board/update', {
            board: docs[0]
        });
    });
});

router.put('/update/:numId', function(req, res) {
    var updateData = {title: req.body.title, body: req.body.body, updatedAt: new Date()};
    Board.update({numId: req.params.numId}, {$set: updateData}, function(err, docs) {
        var msg = '';

    	if (err) {
    		console.error(err);
            msg = 'board update fail';
		}

		res.send(msg).end();
    });
});

router.delete('/delete/:numId', function(req, res) {
    Board.remove({numId: req.params.numId}, function(err) {
        var msg = '';

    	if (err) {
    		console.error(err);
            msg = 'board delete fail';
		}

        res.send(msg).end();
    });
});

module.exports = router;
