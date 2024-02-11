const { Schema, model, Types } = require('mongoose');

const userModel = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        thoughts: [
            {

            }
        ],
        friends: [
            {

            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userModel.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userModel);
module.exports = User;
