export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      // onDelete: 'CASCADE',
    });
  };
  Message.verifyPriority = (priority) => {
    if (priority === 'normal'
      || priority === 'urgent'
      || priority === 'critical') {
      return true;
    }
    return false;
  };

  return Message;
};
