const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtModel = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        ref: 'user',
        required: true
    },
    reactions: [Reaction]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtModel.virtual('CreatedThoughtDate').get(function () {
    return this.createdAt.toISOString();
});

thoughtModel.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtModel);
module.exports = Thought;
