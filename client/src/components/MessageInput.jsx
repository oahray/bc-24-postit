import React from 'react';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 * @function MessageInput
 * @summary: Message input component
 * @param {object} props
 * @returns {jsx} message input
 */
const MessageInput = props => (
  <div className='message-input-container col s12'>
    <div className="input-field message-input col s12 m7">
      <textarea type="text" value={props.inputValue} id="textarea1"
      placeholder='Type Message Here' onChange={props.onInputChange} />
    </div>
    <div id="priority-div" className="input-field col s8 m4">
      <Row>
        <Input s={12}
        className='message-priority-select' type='select'
        value={props.selectValue}
        onChange={props.onSelectChange}>
          <option value='normal'>Normal</option>
          <option value='urgent'>Urgent</option>
          <option value='critical'>Critical</option>
        </Input>
      </Row>
    </div>
    <div className="input-field button-container col s4 m1">
      <button id="message-button"
      className="btn btn-flat white main-text-color waves-effect waves-dark"
      type="submit" name="action" onClick={props.onButtonClick}>
        <i className="material-icons">send</i>
      </button>
    </div>
  </div>
);

MessageInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  // Action types
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default MessageInput;
