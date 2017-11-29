import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGroupMessages, getGroupUsers, getGroupList,
  inGroupPage, sendMessage, markAsRead,
  deleteGroup, removeUser, leaveGroup, editGroupInfo } from '../actions';
import Preloader from '../components/Preloader';
import Message from '../components/Message';
import MessageList from '../components/MessageList';
import UsersList from '../components/UsersList';
import GroupInfo from '../components/GroupInfo';
import MessageInput from '../components/MessageInput';
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
      selectedMessage: {},
      smallScreen: window.innerWidth < 601
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
    this.leaveGroup = this.leaveGroup.bind(this);
    this.editInfo = this.editInfo.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.initMaterial = this.initMaterial.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.smartScroll = this.smartScroll.bind(this);
  }

  /**
   * @function componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getGroupMessages(this.groupId, this.props.token);
    this.props.getGroupUsers(this.groupId, this.props.token);
    window.addEventListener('resize', this.updateDimensions);
  }

  /**
   * @function componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // Initialize materialize components
    this.initMaterial();
    this.props.inGroupPage(true);
    // Scroll messages to bottom
    this.scrollToBottom();

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
      if (this.props.selectedGroup.id &&
        group.id === this.props.selectedGroup.id) {
        this.updateUsersList();
      }
    });
    socket.on('Removed from group', ({ user, group }) => {
      if (group.id === this.props.selectedGroup.id) {
        if (user.id === this.props.user.id) {
          return this.props.history.push('/');
        }
        this.updateUsersList();
      }
    });
    socket.on('Left group', ({ user, group }) => {
      if (group.id === this.props.selectedGroup.id) {
        if (user.id === this.props.user.id) {
          return this.props.history.push('/');
        }
        this.updateUsersList();
      }
    });
  }

  /**
   * @function componentWillReceieveProps
   * @param {object} newProps
   * @returns {undefined}
   */
  componentWillReceiveProps(newProps) {
    if (this.props.selectedGroup &&
      Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      this.props.getGroupUsers(newProps.match.params.groupid, this.props.token);
      this.newMessageAdded(Number(newProps.match.params.groupid));
    }

    // If the request for messages fails
    // and current group cannot be set
    // redirect to dashboard
    if (!newProps.groupMessagesLoading && !newProps.selectedGroup) {
      this.props.history.push('/');
    }
  }

  /**
   * @function componentDidUpdate
   * @summary fires after component updates
   * @param {object} prevProps
   * @param {object} prevState
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    if (prevProps.groupMessages.length !== this.props.groupMessages.length) {
      this.smartScroll();
    }
  }

  /**
   * @function componentWillUnmount
   * @summary: fires when component is about to unmount
   * @returns {undefined} and dispatches action
   */
  componentWillUnmount() {
    this.props.inGroupPage(false);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * @function initMaterial
   * @summary initialize materialize components
   * @returns {undefined}
   */
  initMaterial() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50, html: true });
      $('.modal').modal();
      $('.collapsible').collapsible();
    }, 800);
  }

  /**
   * @function onTypeText
   * @summary fires with onchange input event
   * as user types in the input
   * @param {object} event
   * @returns {undefined} and sets state
   */
  onTypeText(event) {
    this.setState({ content: event.target.value });
  }

  /**
   * @function toggleInfo
   * @summary toggle between displaying group messages
   * or group info on small screens
   * @returns {undefined} and sets state
   */
  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
    this.initMaterial();
  }

  /**
   * @param {object} message
   * @returns {undefined}
   */
  openMessage(message) {
    this.setState({
      messageOpen: true,
      selectedMessage: message
    });
    markAsRead(this.props.selectedGroup.id, message.id, this.props.token);
  }

  /**
   * @returns {undefined} and sets state
   */
  closeMessage() {
    this.setState({
      messageOpen: false,
      selectedMessage: {}
    });
  }

  /**
   * @param {number} groupid
   * @returns {object} action
   */
  newMessageAdded(groupid) {
    return this.props.getGroupMessages(groupid, this.props.token);
  }

  /**
   * @returns {undefined} and sets content state
   */
  sendMessage() {
    if (this.state.content) {
      this.props.sendMessage(
        this.props.selectedGroup.id, this.state.content,
        this.state.priority, this.props.token, this.newMessageAdded
      );
      this.setState({
        content: '',
        priority: 'normal'
      });
    }
  }

  /**
   * @returns {undefined} and sets content state
   */
  deleteGroup() {
    this.props.deleteGroup(this.props.selectedGroup.id, this.props.token);
  }

  /**
   * @returns {undefined} and sets content state
   * @param {string} name: the new group name
   * @param {string} description: the new group name
   * @param {string} type: group type
   */
  editInfo(name, description, type) {
    this.props.editGroupInfo(this.props.selectedGroup.id,
    name, description, type, this.props.token);
  }

  /**
   * @returns {undefined} and sets content state
   */
  updateUsersList() {
    this.props.getGroupUsers(this.groupId, this.props.token);
  }

  /**
   * @param {string} username: the new group name
   * @returns {undefined} and sets content state
   */
  removeUser(username) {
    this.props.removeUser(username, this.props.selectedGroup.id,
    this.updateUsersList, this.props.token);
  }

  /**
   * @returns {undefined}
   */
  leaveGroup() {
    this.props.leaveGroup(this.props.selectedGroup.id, this.props.token);
  }

  /**
   * @returns {undefined}
   */
  updateDimensions() {
    if (window.innerWidth < 600) {
      this.setState({
        smallScreen: true
      });
    } else {
      this.setState({
        smallScreen: false
      });
    }
  }

  /**
   * @returns {undefined}
   */
  scrollToBottom() {
    setTimeout(() => {
      const messages = $('#message-list');
      const scrollHeight = messages.prop('scrollHeight');

      messages.scrollTop(scrollHeight);
    }, 300);
  }

  /**
   * @returns {undefined}
   */
  smartScroll() {
    setTimeout(() => {
      const messages = $('#message-list');
      const newMessage = messages.find('li:last-child');
      const clientHeight = messages.prop('clientHeight');
      const scrollTop = messages.prop('scrollTop');
      const scrollHeight = messages.prop('scrollHeight');
      const newMessageHeight = newMessage.innerHeight();
      const lastMessageHeight = newMessage.prev().innerHeight();

      if (scrollTop + clientHeight + newMessageHeight
        + lastMessageHeight >= scrollHeight - clientHeight) {
        messages.scrollTop(scrollHeight);
      }
    }, 300);
  }

  /**
   * @returns {undefined}
   */
  render() {
    if (!this.props.groupMessagesLoading &&
    this.props.groupMessagesFailed) {
      return (<Redirect to='/' />);
    }

    if (!this.props.selectedGroup) {
      return (<Preloader message='Loading Group...' />);
    }

    const messageList = (<MessageList
    groupMessages={this.props.groupMessages}
    openMessage={this.openMessage} />);

    const messageInput = (
      <MessageInput
      inputValue={this.state.content}
      onInputChange={this.onTypeText}
      selectValue={this.state.priority}
      onSelectChange={event => this.setState({ priority: event.target.value })}
      onButtonClick={this.sendMessage} />
    );

    const messages = (<div className='tab-content row'>
      {this.props.groupMessagesLoading && !this.props.selectedGroup ?
      <Preloader message="Loading group messages..." /> : messageList}
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
    leaveGroup={this.leaveGroup}
    user={this.props.user}/>);

    return (
      <div className='group-page col s12 row'>
        <div className="col s12 z-depth-2 messages-section">
          <h5 className='page-header center'>
            {this.props.selectedGroup.name}
            <span className=
              "right hide-on-med-and-up pointer group-page-header-icon"
            onClick={this.toggleInfo}>
              <i className="material-icons">
              {this.state.showInfo ? 'message' : 'info'}</i>
            </span>
          </h5>
        </div>
        <div className="col s12">
          {this.state.smallScreen && this.state.showInfo ? '' :
          <div className="col s12 m9">{messagesTab}</div>}
          {this.state.smallScreen && !this.state.showInfo ? '' :
          <div className="col s12 m3 group-info-col">
            <ul className="">
              {infoTab}
              <hr/>
              {usersList}
            </ul>
          </div>}
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMessages,
  getGroupUsers,
  getGroupList,
  deleteGroup,
  editGroupInfo,
  removeUser,
  leaveGroup,
  inGroupPage,
  sendMessage },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Group);
