import React, { Component } from 'react';

export default function (props) {
  return (
    <div>
      <a className="waves-effect waves-light btn modal-trigger" href="#confirmModal">{props.triggerLabel}</a>

      <div id="conFirmModal" className="modal">
        <div className="modal-content">
          <p>{props.confirmText}</p>
        </div>
        <div className="modal-footer">
          <span classname="left">
            <a href="#!" className="modal-action modal-close waves-effect waves-green white teal-text btn-flat">No, go back</a>
          </span>
          <span className="right">
            <a href="#!" className="modal-action modal-close waves-effect waves-green white teal-text btn-flat">Yes, do it</a>
          </span>
        </div>
      </div>
    </div>
  )
}
