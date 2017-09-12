import React from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';

export const UsersList = (props) => {
  return (
    <div>
      <h5 className="main-text-color"><i className="material-icons">group</i>{props.groupUsers.length} {props.groupUsers.length === 1 ? 'user' : 'users'}</h5>
      <div>
        <ul>
          {props.groupUsers.map((user) => <li key={user.id}><i className="material-icons">face</i> {user.username} {user.username === props.user.username ? '(you)' : ''}</li>)}
        </ul>
      </div>
      {/* <h6>Leave Group...</h6> */}
    </div>
  );
};

export const GroupInfo = (props) => {
  return (
    <div className='tab-content'>
      <div className='group-info'>
        {props.selectedGroup.type === 'private' ? <p className='edit-group-info-text grey lighten-1 white-text center'><span className='yellow-text lighten-2'><i className='material-icons'>info</i></span> Since <em><strong>{props.selectedGroup.name}</strong></em> is a private group, only <strong>{props.selectedGroup.createdBy.toUpperCase()}</strong> can edit it's info. </p> : <p className='edit-group-info-text green white-text center'>Edit</p>}
        <p> Created by {props.selectedGroup.createdBy.toUpperCase()} on {moment(props.selectedGroup.createdAt).format('Do MMMM, YYYY, [at] h:mma')} </p> 
        <p> Description: {props.selectedGroup.description}</p>
      </div>
    </div>
  );
};
