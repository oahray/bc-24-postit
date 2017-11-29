import React, { Component } from 'react';

/**
 * @class ConfirmModal
 */
export default class ConfirmModal extends Component {
  /**
  * @returns {component} Modal
  */
  render() {
    return (
      <div>
        <a className="waves-effect waves-grey modal-trigger pointer"
        href={`#${this.props.modalId}`}>{this.props.triggerLabel}</a>
        <div id={`${this.props.modalId}`} className="modal confirm-modal">
          <div className="modal-content">
            <h5> {this.props.confirmText}</h5>
          </div>
          <div className="modal-footer">
            <span className="left">
              <a className={`modal-action modal-close waves-effect
              waves-grey white main-text-color btn-flat`}>No, go back</a>
            </span>
            <span className="right">
              <a className={`modal-action modal-close
              waves-effect waves-red white red-text btn-flat`}
              onClick={() => this.props.callback()}
              >Yes, do it</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
