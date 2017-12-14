const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('Users', [{
      id: 11,
      username: 'jon',
      email: 'jonsnow@test.com',
      password: bcrypt.hashSync('testpassword',
        bcrypt.genSaltSync(10), null),
      about: 'She thinks I know nothing',
      imageUrl: 'https://res.cloudinary.com/oahray/image/upload/v1511180899/wbtld0ozxeesyollbrap.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 12,
      username: 'arya',
      email: 'arya@test.com',
      password: bcrypt.hashSync('testpassword',
        bcrypt.genSaltSync(10), null),
      about: 'A girl has no name',
      imageUrl: 'https://res.cloudinary.com/oahray/image/upload/v1511999198/oubuhvhhjuxcksj70gqs.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 13,
      username: 'bran',
      email: 'bran@test.com',
      password: bcrypt.hashSync('testpassword',
        bcrypt.genSaltSync(10), null),
      about: 'The 3-eyed raven',
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Users', null, {})

};
