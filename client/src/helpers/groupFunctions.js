export const isUserGroup = (userGroupList, groupId) =>
  userGroupList.map(group => group.id).indexOf(groupId) !== -1;
