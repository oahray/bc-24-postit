export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('normal', 'urgent', 'critical'),
      allowNull: false
    }
  });
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User);
    Message.belongsTo(models.Group, {
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
