module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ResetPasswords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        unique: false,
        type: Sequelize.STRING,
      },
      hash: {
        unique: true,
        type: Sequelize.STRING,
      },
      expiresin: {
        unique: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('ResetPasswords'),
};
