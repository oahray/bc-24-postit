export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'public'
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
