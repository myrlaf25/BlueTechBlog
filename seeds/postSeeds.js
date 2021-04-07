const { Post } = require('../models');

const postData = [
{

    title: "Random",
    text_area: "This is a random sentence.",
    user_id: 1
},

{
    title: "Binary",
    text_area: "There are only 10 types of people in the world: those that understand binary and those that don't.",
    user_id: 2
},
{
    title: "LogIn Issues",
    text_area: "CAPS LOCK - Preventing Login Since 1980.",
    user_id: 3
},
{
    title: "Google",
    text_area: "Some things Man was never meant to know. For everything else, there's Google.",
    user_id: 4
},
{
    title: "Bugs",
    text_area: "My software never has bugs. It just develops random features.",
    user_id: 5
}

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;