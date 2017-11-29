import React from 'react';
import ConfirmModal from './ConfirmModal';

const ProfileEditor = (props) =>
  (<div className="edit-profile-card col s12 m8 offset-m2 z-depth-1">
    <h5 className="page-header center">Edit Profile</h5>
    <form className="">
      <div className="input-field col s12"
        id="">
        <input className="s12" autoFocus
          value={props.state.about} onChange={event =>
            props.onInputChange(event, 'about')} />
        <label className="active" for="first_name2">About</label>
      </div>

      <div className="input-field col s12">
        {<input className="s12" value={props.state.email}
          onChange={event =>
            props.onInputChange(event, 'email')} />}
        <label className="active" for="first_name2">Email</label>
      </div>

      <div className="col s12 row">
        <div className="col s12 mod-pic-div">
          <span className="left" id="change-pic-text">
            Change your profile picture
          </span>
          <span className=' pointer valign-wrapper'
          id="remove-pic-text">
            <ConfirmModal modalId="del-image-modal"
            triggerLabel="or remove it" callback={props.removeImage}
            confirmText="Sure you want to remove your profile image?" />
          </span>
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>Photo</span>
            <input type="file" onChange={props.pickImage}
              accept=".jpg,.jpeg,.png" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate"
              placeholder="Upload new picture" type="text" />
          </div>
        </div>
      </div>
      <div className="center">
        <a className="btn white red-text"
          onClick={props.endEdit}>Cancel</a>
        <a onClick={props.save}
          className={`btn white main-text-color ${
            props.state.uploading ? 'disabled' : ''
            }`}>
          {props.state.uploading ? 'Uploading...' : 'Save'}
        </a>
      </div>
    </form>
  </div>);

export default ProfileEditor;
