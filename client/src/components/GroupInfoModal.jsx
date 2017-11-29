import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

/**
 * @class ConfirmModal
 */
export default class GroupInfoModal extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: 'public'
    };
    this.saveChanges = this.saveChanges.bind(this);
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selectedGroup) {
      this.setState({
        name: this.props.selectedGroup.name,
        description: this.props.selectedGroup.description || '',
        type: this.props.selectedGroup.type
      });
    }
  }

  /**
   * @returns {undefined}
   */
  saveChanges() {
    this.props.editInfo(this.state.name,
    this.state.description, this.state.type);
  }
  /**
  * @returns {component} Modal
  */
  render() {
    return (
      <div>
        <a className="waves-effect waves-grey modal-trigger pointer"
        href={`#${this.props.modalId}`}>{this.props.triggerLabel}</a>

        <div id={`${this.props.modalId}`} className="modal form-modal">
          <div className="modal-content">
            <h5 className="page-header center">Edit group info</h5>
            <div className='row'>
              <form className='row col s12'>
                <div className="input-field col s12">
                  <input className="s12" label="Group Name" autoFocus
                  value={this.state.name} onChange={event =>
                    this.setState({ name: event.target.value })} />
                  <label class="active" for="first_name2">Group Name</label>
                </div>

                <div className="input-field col s12">
                  {<input className="s12" label="Group description"
                  value={this.state.description}
                  onChange={event =>
                    this.setState({ description: event.target.value })} />}
                  <label class="active" for="first_name2">Description</label>
                </div>

                <Row>
                  <Input s={12} type='select'
                  label="Group Privacy Type" value={this.state.type}
                  onChange={event => this.setState({
                    type: event.target.value })}
                  >
                    <option value='public'>Public</option>
                    <option value='private'>Private</option>
                  </Input>
                </Row>

                <div className="modal-footer">
                  <span className="left">
                    <a className="modal-action modal-close waves-effect waves-dark white main-text-color btn-flat">Cancel</a>
                  </span>
                  <span className="right">
                    <a className="modal-action modal-close waves-effect waves-dark white red-text btn-flat"
                    onClick={this.saveChanges}
                    >Save</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
