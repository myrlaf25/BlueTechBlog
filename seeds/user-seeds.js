const { User } = require('../models');

const userData = [{
        username: 'Julius',
        email: 'j@email.com',
        password: 'jjpassword1'

    },
    {
        username: 'Blake',
        email: 'b@email.com',
        password: 'bbpassword1'
    },
    {
        username: 'Micah',
        email:'m@email.com',
        password: 'mmpassword1'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;