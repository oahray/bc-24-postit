import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';
import { getGroupMessages, getGroupUsers, getGroupList,
  inGroupPage, sendMessage, markAsRead,
  deleteGroup, removeUser, editGroupInfo } from '../actions';
import Preloader from '../components/Preloader';
import Message from '../components/Message';
import MessageList from '../components/MessageList';
import { UsersList, GroupInfo } from '../components/GroupHelpers';
import { isUserGroup } from '../helpers/groupFunctions';

/**
 * Group component
 */
class Group extends Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: 'normal',
      showInfo: false,
      messageOpen: false,
      selectedMessage: {}
    };
    this.groupId = Number(this.props.match.params.groupid);
    this.messageList = document.querySelector('.message-list');
    this.onTypeText = this.onTypeText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.newMessageAdded = this.newMessageAdded.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.openMessage = this.openMessage.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.editInfo = this.editInfo.bind(this);
  }

  componentWillMount() {
    this.props.getGroupMessages(this.groupId, this.props.token);
    this.props.getGroupUsers(this.groupId, this.props.token);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('.collapsible').collapsible();
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50, html: true });
      $('.modal').modal();
    }, 800);

    this.props.inGroupPage(true);
    const socket = io();
    socket.on('Message posted', ({ message, group }) => {
      if (message.sender !== this.props.user.username
      && isUserGroup(this.props.groupList, group.id)
      && group.id === this.groupId
      ) {
        this.newMessageAdded(this.groupId);
      }
    });
    socket.on('Added to group', ({ group }) => {
      if (group.id === this.props.selectedGroup.id) {
        this.updateUsersList();
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedGroup && Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      this.props.getGroupUsers(newProps.match.params.groupid, this.props.token);
      return this.newMessageAdded(Number(newProps.match.params.groupid));
    }
  }

  componentWillUnmount() {
    this.props.inGroupPage(false);
  }

  onTypeText(event) {
    this.setState({ content: event.target.value });
  }

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  openMessage(message) {
    this.setState({
      messageOpen: true,
      selectedMessage: message
    });
    markAsRead(this.props.selectedGroup.id, message.id, this.props.token);
  }

  closeMessage() {
    this.setState({
      messageOpen: false,
      selectedMessage: {}
    });
  }

  newMessageAdded(groupid) {
    return this.props.getGroupMessages(groupid, this.props.token);
  }

  sendMessage() {
    if (this.state.content) {
      this.props.sendMessage(this.props.selectedGroup.id, this.state.content, this.state.priority, this.props.token, this.newMessageAdded);
      this.setState({
        content: ''
      });
    }
  }

  deleteGroup() {
    this.props.deleteGroup(this.props.selectedGroup.id, this.props.token);
  }

  editInfo(name, description, type) {
    this.props.editGroupInfo(this.props.selectedGroup.id,
    name, description, type, this.props.token);
  }

  updateUsersList() {
    this.props.getGroupUsers(this.groupId, this.props.token);
  }

  removeUser(username) {
    this.props.removeUser(username, this.props.selectedGroup.id,
    this.updateUsersList, this.props.token);
  }

  render() {
    if (!this.props.groupMessagesLoading && this.props.groupMessagesFailed) {
      return (<Redirect to='/' />);
    }

    if (!this.props.selectedGroup) {
      return (<Preloader message='Loading Group...' />);
    }

    const messageList = (<MessageList groupMessages={this.props.groupMessages} openMessage={this.openMessage} />);

    const messageInput = (
      <div className='message-input-container col s12'>
        <div className="input-field message-input col s12 m7">
          <textarea type="text" value={this.state.content} id="textarea1" placeholder='Type Message Here' onChange={this.onTypeText} />
        </div>
        <div className="input-field col s8 m4">
          <Row>
            <Input s={12} className='message-priority-select' type='select'
            defaultValue='normal'
            onChange={event => this.setState({ priority: event.target.value })}>
              <option value='normal'>Normal</option>
              <option value='urgent'>Urgent</option>
              <option value='critical'>Critical</option>
            </Input>
          </Row>
        </div>
        <div className="input-field button-container col s4 m1">
          <button className="btn btn-flat white main-text-color waves-effect waves-dark" type="submit" name="action" onClick={this.sendMessage}><i className="material-icons">send</i></button>
        </div>
      </div>
    );

    const messages = (<div className='tab-content row'>
      {this.props.groupMessagesLoading ? <Preloader message="Loading group messages..." /> : messageList}
      {messageInput}
    </div>);

    const showOpenMessage = (
      <div className="row col s12">
        <div className="tab-content col s12">
          <Message message={this.state.selectedMessage}
          closeMessage={this.closeMessage} user={this.props.user}/>
        </div>
      </div>
    );

    const messagesTab = (
      this.state.messageOpen ? showOpenMessage : messages
    );

    const infoTab = (<GroupInfo
    selectedGroup={this.props.selectedGroup}
    user={this.props.user}
    editInfo={this.editInfo}
    deleteGroup={this.deleteGroup}/>);

    const usersList = (<UsersList groupUsers={this.props.groupUsers}
    selectedGroup={this.props.selectedGroup}
    removeUser={this.removeUser}
    user={this.props.user}/>);

    return (
      <div className='group-page col s12 row'>
        <div className="col s12 z-depth-2">
          <h5 className='page-header'>        
            {this.props.selectedGroup.name}
            <span className="right hide-on-large-only pointer" onClick={this.toggleInfo}>
              <i className="material-icons">info</i>
            </span>
          </h5>
        </div>
        <div className="col s12">
          <div className="col s12 l9">{messagesTab}</div>
          <div className="col s12 l3 group-info-col">
            <ul className="">
              {infoTab}
              <hr/>
              {usersList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  groupList: PropTypes.array,
  groupUsers: PropTypes.array,
  groupMessagesLoading: PropTypes.bool,
  groupMessagesFailed: PropTypes.bool,
  selectedGroup: PropTypes.object,
  groupMessages: PropTypes.array,
  // Action creators
  getGroupMessages: PropTypes.func,
  getGroupUsers: PropTypes.func,
  getGroupList: PropTypes.func,
  inGroupPage: PropTypes.func,
  sendMessage: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user,
  token: state.token,
  isLoggedIn: state.isAuthenticated,
  groupList: state.groupList,
  groupUsers: state.groupUsers,
  groupMessagesLoading: state.groupMessagesLoading,
  groupMessagesFailed: state.groupMessagesFailed,
  selectedGroup: state.selectedGroup,
  groupMessages: state.groupMessages
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getGroupMessages,
  getGroupUsers,
  getGroupList,
  deleteGroup,
  editGroupInfo,
  removeUser,
  inGroupPage,
  sendMessage },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Group);
