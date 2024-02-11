const { Schema, model, Types } = require('mongoose');
const Mongoose = require('mongoose');

const reactionModel = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

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
    reactions: [reactionModel]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtModel.virtual('CreatedOnDate').get(function () {
    return this.createdAt.toISOString();
});

thoughtModel.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtModel);
module.exports = Thought;
