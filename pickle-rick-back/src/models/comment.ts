const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    characterId: {
        type: Number,
        required: [true, "Character Id is required"]
    },
    characterName: {
        type: String,
        required: [true, "Character Name is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    comment: {
        type: String,
        required: [true, "Comment is required"]
    },
}, { versionKey: false });

module.exports = model('Comment', CommentSchema);
