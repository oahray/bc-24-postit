import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
if (env === 'development') {
  sequelize = new Sequelize(process.env.DEV_DB_URI);
} else if (env === 'test') {
  sequelize = new Sequelize(process.env.TEST_DB_URI);
} else {
  sequelize = new Sequelize(process.env.DATABASE_URI);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const gracefulShutdown = (msg, callback) => {
  db.connectorManager.disconnect(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

module.exports = db;
