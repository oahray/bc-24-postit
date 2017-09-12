export const IN_GROUP_TRUE = 'IN_GROUP_TRUE';
export const IN_GROUP_FALSE = 'IN_GROUP_FALSE';

export function inGroupPage (inPage) {
  if (inPage) {
    return {
      type: IN_GROUP_TRUE
    }
  } else {
    return {
      type: IN_GROUP_FALSE
    }
  }
} 