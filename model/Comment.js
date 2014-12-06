var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

// schema
var CommentSchema = new Schema({
	author: {type: String, required: true},
	message: {type: String, required: true},
	createdAt: {type: Date, default: Date.now}
});

// statics

// methods

// model
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
