export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Group.associate = (models) => {
    // associations can be defined here
    Group.hasMany(models.Message, {
      as: 'Group',
      foreignKey: 'groupId'
    });
    Group.belongsToMany(models.User, {
      through: models.UserGroup,
      foreignKey: 'groupId'
    });
  };
  return Group;
};
