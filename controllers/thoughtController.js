const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought (req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            
            if(!thoughtData) {
                return res.status(404).json({ message: 'No Thought Found!' });
            }
            res.json(thoughtData);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createThought (req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.username },
                { $addToSet: { thoughts: thoughtData } },
                { new: true }
            );
            if(!userData) {
                return res.status(404).json({ message: 'That User Doesnt Exist!' });
            }
            res.json(thoughtData);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if(!thoughtData) {
                return res.status(404).json({ message: 'No Thought Found!' });
            }

            res.json({ message: 'Thought updated!'});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            const userData = await User.findOneAndUpdate(
                { _id: thoughtData.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if(!thoughtData) {
                return res.status(404).json({ message: 'No Thought Found!' });
            }

            if(!userData) {
                return res.status(404).json({ message: 'No User Found!' });
            }

            res.status(200).json({ message: 'Thought Deleted!' })
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            const userData = await User.findOne({ _id: thoughtData.username });

            if(!thoughtData) {
                return res.status(404).json({ message: 'No Thought Found!' });
            }

            if(!userData) {
                return res.status(404).json({ message: 'No User Found!' });
            }

            thoughtData.reactions.push(req.body);
            await thoughtData.save();
            res.json(thoughtData);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: thoughtData.username },
                { $pull: { reactions: {reactionId: req.params.reactionId} } },
                { new: true }
            );

            if(!thoughtData) {
                return res.status(404).json({ message: 'No Thought Found!' });
            }
            res.json({ message: 'Reaction Deleted!' });
        } catch(err) {
            res.status(500).json(err);
        }
    }
};