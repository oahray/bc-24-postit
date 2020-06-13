import models from '../../models';
import { seedUsers, seedGroups } from './seed';

export const populateUsers = () => models.User.bulkCreate(seedUsers.registered)


export const createPopulatedGroups = (users) => {
  models.Group.bulkCreate(seedGroups).then((groups) => {
    groups.forEach((group) => {
      group.addUser(users[2].id);
    });
  });
};

export const doBeforeAll = () => {
  before((done) => {
    models.Message.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.UserGroup.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Group.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    populateUsers().then(users => createPopulatedGroups(users))

    done();
  });
};
