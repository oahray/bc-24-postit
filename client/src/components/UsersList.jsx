import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';
import UserInfoModal from '../components/UserInfoModal';

/**
 * @function UsersList
 * @summary: List of users in group
 * @param {object} props
 * @returns {jsx} users list
 */
const UsersList = props => (
  <li className="grey">
    <ul class="collapsible" id="group-user-list" data-collapsible="accordion">
      <li>
        <div className={`collapsible-header main-background-color
        white-text valign-wrapper group-users-header`}>
          <i className="material-icons">group</i>
          {props.groupUsers.length} {props.groupUsers.length === 1 ?
          ' user' : ' users'}
        </div>
        <div className="white collapsible-body">
          <ul className=" collection">
            {props.groupUsers.map(user => (
              <li className="collection-item row" key={user.id}>
                <span className="col s6">
                  {(user.username === props.user.username) ?
                  user.username :
                  <UserInfoModal user={user} />}
                  {user.username ===
                    props.user.username ? <small> (you)</small> : ''}
                </span>
                {(props.user.username === props.selectedGroup.createdBy
                && user.username !== props.user.username) ?
              <span className="secondary-content pointer">
                <ConfirmModal triggerLabel={<i
                className="material-icons tooltipped leave-group-option"
                data-position="bottom" data-delay="50"
                data-tooltip={`Remove ${user.username} from group`}
                ><small>clear</small></i>}
                modalId={`remove-${user.username}`}
                callback={() => props.removeUser(user.username)}
                confirmText={`Sure you want to remove ${user.username}
                from this group? This cannot be undone.`}
                />
              </span> : ''}
              {user.username === props.user.username &&
              props.user.username !== props.selectedGroup.createdBy ?
              <span className="right pointer">
                <ConfirmModal triggerLabel={<i className="tooltipped"
                  data-position="left" data-delay="50"
                  data-tooltip={'Leave group'}
                  ><small>leave</small></i>}
                  modalId={`leave-group-${props.selectedGroup.id}`}
                  callback={props.leaveGroup}
                  confirmText={
                    'Sure you want to leave this group? This cannot be undone.'
                  }
                />
              </span> : ''}
            </li>))}
          </ul>
        </div>
      </li>
    </ul>
  </li>
);

UsersList.propTypes = {
  user: PropTypes.object,
  groupUsers: PropTypes.array,
  selectedGroup: PropTypes.object,
  // Action Creators
  leaveGroup: PropTypes.func,
  removeUser: PropTypes.func
};

export default UsersList;
