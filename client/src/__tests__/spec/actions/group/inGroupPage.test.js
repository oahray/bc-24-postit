import {
  inGroupPage
} from '../../../../actions';

import {
  IN_GROUP_TRUE,
  IN_GROUP_FALSE
} from '../../../../constants';

describe('inGroupPage action creator', () => {
  test(`returns an action with type IN_GROUP_FALSE
  when not called with anything that is not the boolean true`,
  () => {
    // mocks the post request
    expect(inGroupPage().type).toBe(IN_GROUP_FALSE);
    expect(inGroupPage(2).type).toBe(IN_GROUP_FALSE);
    expect(inGroupPage('true').type).toBe(IN_GROUP_FALSE);
  });

  test(`returns an action with type IN_GROUP_FALSE
  when called with the boolean true`, () => {
    // mocks the post request
    const resetStatus = inGroupPage(true);
    expect(resetStatus.type).toBe(IN_GROUP_TRUE);
  });
});
