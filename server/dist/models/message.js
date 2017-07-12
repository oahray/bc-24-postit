'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM,
      values: ['normal', 'urgent', 'critical'],
      allowNull: false
    }
  });
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId'
      // onDelete: 'CASCADE',
    });
  };
  Message.verifyPriority = function (priority) {
    if (priority === 'normal' || priority === 'urgent' || priority === 'critical') {
      return true;
    }
    return false;
  };

  return Message;
};