import { CLEAR_FORM_ERROR } from './../../constants';

/**
 * @function clearFormError
 * @description: action creator that returns an action
 * with CLEAR_FORM_ERROR type
 * @returns {object} clear_form_error action
 */
export const clearFormError = () => ({
  type: CLEAR_FORM_ERROR
});
