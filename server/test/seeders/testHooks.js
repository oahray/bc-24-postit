import models from '../../models';
import { seedUsers } from './seed'

export const doBeforeAll = () => {
  before((done) => {
    models.User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Group.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.UserGroup.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Message.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

export const doBeforeEach = () => {
  beforeEach((done) => {
    models.sequelize.sync();
    done();
  });
};

export const populateUsers = () => {
  models.User.bulkCreate(seedUsers.registered);
}