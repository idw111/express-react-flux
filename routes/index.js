var express = require('express');
var router = express.Router();
var Comment = require('../model/Comment');

router.get('/', function(req, res) {
	return res.render('index');
});

router.get('/comments.json', function(req, res) {
	Comment.find({}, function(err, comments) {
		if (err) throw err;
		return res.json(comments);
	});
});

router.post('/comments.json', function(req, res) {
	var author = req.param('author') || 'NA';
	var message = req.param('message') || 'NA';
	var comment = new Comment({author: author, message: message});
	comment.save(function(err) {
		if (err) throw err;
		Comment.find({}, function(err, comments) {
			if (err) throw err;
			return res.json(comments);
		});
	});
});

module.exports = router;
