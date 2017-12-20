import axios from 'axios';
import toastr from 'toastr';

import {
  BASE_URL,
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE
} from '../../constants';

/**
 * @function uploadImage
 * @description function to upload image to cloud
 * @param {Object} image
 * @returns {Promise} cloudinary response
 */
export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('tags', 'postit, profiles');
  formData.append('upload_preset', process.env.CLOUDINARY_PRESET);
  formData.append('api_key', process.env.CLOUDINARY_KEY);
  formData.append('timestamp', Date.now() / 1000);

  return axios.post(process.env.CLOUDINARY_URL, formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
};

/**
 * @function editProfileLoading
 * @description: function that dispatches an action
 * with an EDIT_PROFILE_LOADING type
 * @returns {Object} editProfileLoading action
 */
const editProfileLoading = () => ({
  type: EDIT_PROFILE_LOADING
});

/**
 * @function editProfileSuccess
 * @param {Object} response
 * @returns {Object} editProfileSuccess action
 */
const editProfileSuccess = response => ({
  type: EDIT_PROFILE_SUCCESS,
  response
});

/**
 * @function editProfileError
 * @param {string} error
 * @returns {Object} editProfileError action
 */
const editProfileFailure = error => ({
  type: EDIT_PROFILE_FAILURE,
  error
});

/**
 * @function editProfile
 * @description function that makes request to
 * edit a user's profile and dispatch action creators
 * afterwards depending on api response
 * @param {*} about
 * @param {*} email
 * @param {*} imageUrl
 * @param {*} token
 * @returns {function} dispatch
 */
export const editProfile = (about, email, imageUrl, token) => (
  (dispatch) => {
    dispatch(editProfileLoading());
    const FETCH_URL = `${BASE_URL}/user/me/edit`;
    return axios({
      method: 'patch',
      url: FETCH_URL,
      data: {
        about,
        email,
        imageUrl
      },
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      toastr.info(response.data.message);
      dispatch(editProfileSuccess(response));
    })
    .catch((err) => {
      toastr.info(err.response.data.error);
      dispatch(editProfileFailure(err.response.data.error));
    });
  }
);
