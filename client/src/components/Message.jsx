import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function Message(props) {
  const readByUsers = props.message.readBy.split(',').filter(username => username !== props.message.sender).join(', ');
  return (
    <div className="message-container z-depth-1">
      <div className="col s12 grey lighten-3">
          <h5 className="col s12">{props.message.sender} 
            <span className="grey-text center timestamp"><small>
              {moment(props.message.createdAt).format(' hh:MMa MMMM Do YYYY')}</small></span>
            <span className="right close-icon" onClick={props.closeMessage}><small><i className="material-icons">close</i></small></span>
          </h5>
      </div>
      <div className="col s12 white display-linebreak">
        {props.message.content}
      </div>
      <div className="grey lighten-3">
        <hr />
        <small>{readByUsers ?
          `Read by: ${readByUsers}` :
          'No one has read this message'}
        </small>
      </div>
    </div>
  );
}

Message.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object,
  closeMessage: PropTypes.func
};
