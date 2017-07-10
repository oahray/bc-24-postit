'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Group.associate = function (models) {
    // associations can be defined here
    Group.hasMany(models.Message, {
      as: 'groupMessages'
    });
    Group.belongsToMany(models.User, {
      through: 'userGroup',
      as: 'groupUsers'
    });
  };
  return Group;
};
//# sourceMappingURL=group.js.map