import React from 'react';
import moment from 'moment';

const Profile = (props) => {
  const profilePic = (props.state.imageUrl ?
    props.state.imageUrl : '/images/no-pic.png');
  return (<div className="edit-profile-card col s10 offset-s1 z-depth-1">
    <h5 className="page-header profile-header center">My Profile</h5>
    <br/>
    <div className="col s12 l7">
      <div className="photo-and-info center">
        <div className="full-photo-div">
          <img className="full-photo responsive-img center"
          src={props.user.photo ?
            props.user.photo : profilePic}
            alt="profile photo" />
        </div>
      </div>
    </div>

    <div className="col s12 l5">
      <div className="join-info">
        <h5>{props.user.username}</h5>
        <p>
          <small>Registered <strong>{moment(props.user.createdAt)
            .format('Do MMMM, YYYY, [at] h:mma')}</strong></small>
        </p>
        </div>
      <div className="user-info">
        <p className="main-text-color page-header">
          <strong>PERSONAL INFO</strong>
          <span className="pointer right">
            <a onClick={props.edit}>Edit</a>
          </span>
        </p>
        <p><strong>About me: </strong>{props.user.about}</p>
        <p><strong>Email: </strong>{props.user.email}</p>
      </div>
    </div>
  </div>);
};

export default Profile;
