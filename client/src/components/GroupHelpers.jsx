import React from 'react';
import moment from 'moment';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';
import GroupInfoModal from './GroupInfoModal';

export const UsersList = props => (
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
              <li className="collection-item" key={user.id}>
              {user.username} {user.username ===
                props.user.username ? '(you)' : ''}
              {(props.user.username === props.selectedGroup.createdBy
              && user.username !== props.user.username) ?
              <span className="right valign-wrapper pointer">
                <ConfirmModal triggerLabel={<i
                className="material-icons tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip={`Remove ${user.username} from group`}
                ><small>clear</small></i>}
                modalId={`remove${user.username}`}
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
                  confirmText={'Sure you want to leave this group? This cannot be undone.'}
                />
              </span> : ''}
            </li>))}
          </ul>
        </div>
      </li>
    </ul>
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
          <ConfirmModal triggerLabel={<i
          className="material-icons red-text tooltipped"
          data-position="bottom" data-delay="50"
          data-tooltip="Delete group">delete</i>}
          modalId='deleteGroupModal'
          confirmText={`Sure you want to delete this group?
          This cannot be undone.`}
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

export const MessageInput = props => (
  <div className='message-input-container col s12'>
    <div className="input-field message-input col s12 m7">
      <textarea type="text" value={props.inputValue} id="textarea1"
      placeholder='Type Message Here' onChange={props.onInputChange} />
    </div>
    <div className="input-field col s8 m4">
      <Row>
        <Input s={12} className='message-priority-select' type='select'
        value={props.selectValue}
        onChange={props.onSelectChange}>
          <option value='normal'>Normal</option>
          <option value='urgent'>Urgent</option>
          <option value='critical'>Critical</option>
        </Input>
      </Row>
    </div>
    <div className="input-field button-container col s4 m1">
      <button
      className="btn btn-flat white main-text-color waves-effect waves-dark"
      type="submit" name="action" onClick={props.onButtonClick}>
        <i className="material-icons">send</i>
      </button>
    </div>
  </div>
);
