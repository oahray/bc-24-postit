import React, { Component } from 'react';

export default function (props) {
  return (
    <div className="message-container z-depth-1">
      <div className="col s12">
          <h5 className="col s12">{props.message.sender} <span className="right" onClick={props.closeMessage}>x</span></h5>
      </div>
      <div className="col s12 display-linebreak">
        {props.message.content}
      </div>
      <div> READ BY: {props.message.readBy}
      </div>
    </div>
  )
}