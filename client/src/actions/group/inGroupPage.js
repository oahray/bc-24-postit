export const IN_GROUP_TRUE = 'IN_GROUP_TRUE';
export const IN_GROUP_FALSE = 'IN_GROUP_FALSE';

/** inGroupPage
 * @summary: action creator to determine whether or not
 * user is currently in a group page
 * @param {bool} inPage
 * @returns {object} actions
 */
export function inGroupPage(inPage) {
  if (inPage) {
    return {
      type: IN_GROUP_TRUE
    };
  }
  return {
    type: IN_GROUP_FALSE
  };
}
