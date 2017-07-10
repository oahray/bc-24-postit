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
      type: DataTypes.ENUM('normal', 'urgent', 'critical'),
      allowNull: false
    }
  });
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User);
    Message.belongsTo(models.Group, {
      onDelete: 'CASCADE'
    });
  };
  return Message;
};
//# sourceMappingURL=message.js.map