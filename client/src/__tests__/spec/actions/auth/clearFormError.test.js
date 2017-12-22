
import { clearFormError } from '../../../../actions';
import { CLEAR_FORM_ERROR } from '../../../../constants';

describe('clearFormError action creator', () => {
  test('dispatches an action with type "CLEAR_FORM_ERROR"', () => {
    const loadingUser = clearFormError();
    const expectedAction = {
      type: CLEAR_FORM_ERROR
    };
    expect(loadingUser).toEqual(expectedAction);
  });
});
