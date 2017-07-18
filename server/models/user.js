import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  // setup User model and its fields.
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  // Instance method to prevent password from
  // being sent to client.
  User.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  // Instance method to compare password sent from client
  // with the hashed password of user with that username
  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ id: user.id, access },
      process.env.MY_SUPER_SECRET, { expiresIn: 24 * 60 * 60 }).toString();
    return token;
  };

  // Salt and hash passwords before creating users
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password,
    bcrypt.genSaltSync(10), null);
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Message, {
      as: 'userMessages',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: 'userId'
    });
  };
  return User;
};
