export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    readBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
    });
  };
  Message.verifyPriority = (priority) => {
    priority = priority.trim().toLowerCase();
    if (priority === 'normal'
      || priority === 'urgent'
      || priority === 'critical') {
      return true;
    }
    return false;
  };

  return Message;
};
