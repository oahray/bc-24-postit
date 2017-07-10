export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Group.associate = (models) => {
    // associations can be defined here
    Group.hasMany(models.Message, {
      as: 'groupMessages',
    });
    Group.belongsToMany(models.User, {
      through: 'userGroup',
      as: 'groupUsers',
    });
  };
  return Group;
};
