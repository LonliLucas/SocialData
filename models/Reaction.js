const { Schema, model, Types, Mongoose } = require('mongoose');

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

reactionModel.virtual('CreatedReactionDate').get(function () {
    return this.createdAt.toISOString();
});

const Reaction = model('reaction', reactionModel);
module.exports = Reaction;
