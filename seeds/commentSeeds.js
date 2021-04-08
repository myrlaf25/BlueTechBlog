const { Comment } = require('../models');

const commentData = [{

        comment_text: "Lorem ipsum dolor sit amet",
        post_id: 1,
        user_id: 1,
    },
    {
        
        comment_text: "consectetur adipiscing elit",
        post_id: 2,
        user_id: 2,
    },
    {
        
        comment_text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        post_id: 3,
        user_id: 3,
    },
    {
        
        comment_text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        post_id: 4,
        user_id: 4,
    },
    {
        
        comment_text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        post_id: 5,
        user_id: 5,
    }
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;