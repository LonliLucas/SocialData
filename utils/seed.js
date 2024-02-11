const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, addThoughts } = require('./data');

connection.once('open', async () => {
    console.log('Database connection complete');

    let checkThought = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (checkThought.length) {
        await connection.dropCollection('thoughts')
    }
    let checkUser = await connection.db.listCollections({ name: 'users' }).toArray();
    if (checkUser.length) {
        await connection.dropCollection('users')
    }

    await User.collection.insertMany(users);
    const thoughts = addThoughts(users);
    await Thought.collection.insertMany(thoughts);

    for (let i = 0; i < thoughts.length; i++) {
        const thought = thoughts[i]

        await User.findOneAndUpdate(
            { _id: thought.username },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
    }

    console.table(users);
    console.table(thoughts);
    console.info('Added seed information!');
    process.exit(0);

});