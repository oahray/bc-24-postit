import React from 'react';
import moment from 'moment';
import ConfirmModal from './ConfirmModal';
import GroupInfoModal from './GroupInfoModal';
// import PropTypes from 'prop-types';

export const UsersList = props => (
  <li className="grey">
    <div className="grey white-text valign-wrapper group-users-header">
      <i className="material-icons">group</i>
      {props.groupUsers.length} {props.groupUsers.length === 1 ?
       ' user' : ' users'}
    </div>
    <div className="white">
      <ul className="collection">
        {props.groupUsers.map(user => (
          <li className="collection-item" key={user.id}>
          {user.username} {user.username === props.user.username ? '(you)' : ''}
          {(props.user.username === props.selectedGroup.createdBy
          && user.username !== props.user.username) ?
          <span className="right valign-wrapper pointer">
            <ConfirmModal triggerLabel={<i className="material-icons tooltipped"
            data-position="bottom" data-delay="50"
            data-tooltip={`Remove ${user.username} from group`}
            ><small>clear</small></i>}
            modalId={`remove${user.username}`}
            callback={() => props.removeUser(user.username)}
            confirmText={`Sure you want to remove ${user.username} from this group? This cannot be undone.`}
            />
          </span> : ''}
        </li>))}
      </ul>
    </div>
    {/* <h6>Leave Group...</h6> */}
  </li>
);

export const GroupInfo = props => (
  <li>
    <div className="main-text-color">
      GROUP INFO
      {props.user.username === props.selectedGroup.createdBy ?
      <span className="right">
        <span className="pointer left">
          <GroupInfoModal
          triggerLabel={<i className="material-icons main-text-color tooltipped"
          data-position="bottom" data-delay="50"
          data-tooltip="Edit group info">edit</i>}
          selectedGroup={props.selectedGroup}
          editInfo={props.editInfo}
          modalId={`editGroup${props.selectedGroup.id}`}
          />
        </span>
        <span className="pointer right">
          <ConfirmModal triggerLabel={<i className="material-icons red-text tooltipped"
          data-position="bottom" data-delay="50"
          data-tooltip="Delete group">delete</i>}
          modalId='deleteGroupModal'
          confirmText={`Sure you want to delete this group? This cannot be undone.`}
          callback={props.deleteGroup} />
        </span>
      </span> : ''}
    </div>
    <div className='group-info'>
      <p>
        Created by {props.selectedGroup.createdBy.toUpperCase()} on {
          moment(props.selectedGroup.createdAt)
          .format('Do MMMM, YYYY, [at] h:mma')
        }
      </p>
      <p> Description: {props.selectedGroup.description ?
        props.selectedGroup.description : 'No description added.'}</p>
    </div>
  </li>
);
