const { User } = require('../models');

const userData = [{
        username: 'Julius',
        password: 'jjpassword1'

    },
    {
        username: 'Blake',
        password: 'bbpassword1'
    },
    {
        username: 'Micah',
        password: 'mmpassword1'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;