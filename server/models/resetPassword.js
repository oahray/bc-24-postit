export default (sequelize, DataTypes) => {
  const ResetPassword = sequelize.define('ResetPassword', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  return ResetPassword;
};
