const { Post } = require('../models');

const postData = [{
        title: 'Binary',
        content: "There are only 10 types of people in the world: those that understand binary and those that don't",
        user_id: 1

    },
    {
        title: "Google",
        content: "Some things Man was never meant to know. For everything else, there's Google.",
        user_id: 2
    },
    {
        title: "Bugs",
        content: "My software never has bugs. It just develops random features.",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;