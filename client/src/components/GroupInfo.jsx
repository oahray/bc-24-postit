import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';
import GroupInfoModal from './GroupInfoModal';

/**
 * @function GroupInfo
 * @summary Group information
 * @param {object} props
 * @returns {jsx} info element
 */
const GroupInfo = props => (
  <li>
    <div className="main-text-color page-header">
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
      <p> {props.selectedGroup.description ?
        `Description: ${props.selectedGroup.description}` :
        'No description added.'}</p>
    </div>
  </li>
);

GroupInfo.propTypes = {
  user: PropTypes.object.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  // Action Creators
  editInfo: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
};

export default GroupInfo;
