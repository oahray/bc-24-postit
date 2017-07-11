'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ = require('lodash');
var bcrypt = require('bcryptjs');

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Message, {
      as: 'userMessages'
    });
    User.belongsToMany(models.Group, {
      through: 'userGroup',
      as: 'userGroups'
    });
  };
  // User.beforeCreate((user, options) => {
  //   return bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(user.password, salt, (err, hash) => {
  //       user.password = hash;
  //     });
  //   });
  // });

  // User.prototype.toJSON = function () {
  //   const user = this;
  //   const userObject = user.toObject();

  //   return _.pick(userObject, ['id', 'username', 'email']);
  // };
  return User;
};
//# sourceMappingURL=user.js.map