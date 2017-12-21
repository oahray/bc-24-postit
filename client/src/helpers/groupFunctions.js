/**
 * @function isUserGroup
 * @description checks if specified group,
 *  is part of a user's group
 * @param {array} userGroupList
 * @param {Number} groupId
 * @returns {Boolean} true if the groupId belongs
 * to a group in the users group list
 */
export const isUserGroup = (userGroupList, groupId) =>
  userGroupList.map(group => group.id).indexOf(groupId) !== -1;
