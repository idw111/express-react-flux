var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	return res.redirect('/index.html');
});

router.get('/comments.json', function(req, res) {
	var n = Math.floor(Math.random() * 1000000);
	res.json([
		{"author": "Pete Hunt", "text": "This is one comment " + n},
		{"author": "Jornan Walke", "text": "This is *another* comment " + n}
	]);
});

router.post('/comments.json', function(req, res) {
	var n = Math.floor(Math.random() * 1000000);
	var author = req.param('author') || 'NA';
	var text = req.param('text') || 'NA';
	res.json([
		{author: "Pete Hunt", text: "This is one comment " + n},
		{author: "Jornan Walke", text: "This is *another* comment " + n},
		{author: author, text: text}
	]);
});

module.exports = router;
