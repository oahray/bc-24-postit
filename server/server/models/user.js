const _ = require('lodash');

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Message, {
      as: 'userMessages',
    });
    User.belongsToMany(models.Group, {
      through: 'userGroup',
      as: 'userGroups',
    });
  };
  // User.prototype.toJSON = function () {
  //   const user = this;
  //   const userObject = user.toObject();

  //   return _.pick(userObject, ['id', 'username', 'email']);
  // };
  return User;
};
