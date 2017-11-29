export const IN_GROUP_TRUE = 'IN_GROUP_TRUE';
export const IN_GROUP_FALSE = 'IN_GROUP_FALSE';

/**
 * @constructor
 * @param {bool} inPage
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
