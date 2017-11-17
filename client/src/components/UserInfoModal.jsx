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
        <a className="waves-effect waves-grey modal-trigger user-info-trigger pointer"
          href={`#user${this.props.user.id}-modal`}>{this.props.user.username}</a>
        <div id={`user${this.props.user.id}-modal`}
          className="modal user-info-modal">
          <div className="modal-content center">
            <h3> {this.props.user.username}</h3>
            <div className="full-photo-div">
              <img className="user-info-img"
              src={this.props.user.imageUrl ? this.props.user.imageUrl :
              '/images/no-pic.png'} />
            </div>
            <p>About Me: {this.props.user.about}</p>
          </div>
          <div className="modal-footer center">
            <a className={`modal-action modal-close waves-effect
              waves-grey white main-text-color btn-flat`}>Close</a>
          </div>
        </div>
      </div>
    );
  }
}
