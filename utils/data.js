const users = [ 
    { username: 'Devguy', email: 'devguy@develop.com'}, 
    { username: 'Testdude', email: 'testdude@testing.com'} 
]

for (let i = 0; i < 10; i++) {
    users.push({ username: `user${i}`, email: `user${i}@numbers.com`})
}

function addThoughts(users) {
    const thoughts = [];
    users.forEach((user) => {
        const thought = {
            thoughtText: `Thought by ${user.username}`,
            username: user._id,
            reactions: []
        };

        for (let i = 0; i < 3; i++) {
            thought.reactions.push({
                reactionBody: `${i} reaction!`,
                username: user.username
            });
        }
        thoughts.push(thought)
    });

    return thoughts;
}

module.exports = { users, addThoughts };