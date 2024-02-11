const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select(
                '-__v'
            );
            if(!user) {
                return res.status(404).json({ message: 'No User Found!' });
            }
            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            if(!userData) {
                return res.status(404).json({ message: 'That User Doesnt Exist!' });
            }
            res.json(userData)
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId });
            const thoughts = await Thought.find({ username: req.params.userId });

            if(!userData) {
                return res.status(404).json({ message: 'That User Doesnt Exist!' });
            }

            if (thoughts.length > 0) {
                for (const thought of thoughts) {
                    await thought.remove();
                }
            }

            await User.deleteOne({ _id: req.params.userId });
            res.json({ message: `Deleted User ${userData}`});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friendData = await User.findOne({ _id: req.params.friendId });
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: friendData._id }},
                { new: true }
            );

            if(!friendData) {
                return res.status(404).json({ message: 'No friend with that ID' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const friendData = await User.findOne({ _id: req.params.friendId });
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: friendData._id }},
                { new: true }
            );

            if(!friendData) {
                return res.status(404).json({ message: 'No friend with that ID' });
            }

            res.json(userData);
        } catch(err) {
            res.status(500).json(err);
        }
    }
};