import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * @class MessageList
 */
export default class MessageList extends Component {
  /**
   * @return {jsx} MessageList
   */
  render() {
    return (
      <div className="message-list" id="message-list">
        {this.props.groupMessages.length > 0 ?
        <ul id="messages-ul" className="collection">
          {this.props.groupMessages.map(message => (<li
            className='collection-item message-item truncate'
            id={`message-${message.groupid}${message.id}`}
            key={message.id}
            onClick={() => this.props.openMessage(message)}>
            <strong> {message.sender}</strong>
            <span className='grey-text timestamp'>
            <small>
              {moment(message.createdAt).fromNow()}
            </small></span>
            <span className='right'><small>{message.priority} message</small>
            </span><br />{message.content}</li>
          ))}
        </ul> :
        <h6 className="no-messages">
          This group does not contain any messages
        </h6>}
      </div>
    );
  }
}

MessageList.propTypes = {
  groupMessages: PropTypes.array,
  openMessage: PropTypes.func
};
