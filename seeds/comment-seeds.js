const { Comment } = require('../models');

const commentData = [{
        comment_text: "This deserves a 10",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Gotta love Google!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Features have a mind of their own.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;