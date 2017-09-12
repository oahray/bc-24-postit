import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Tabs, Tab, Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';
import { getGroupMessages, getGroupUsers, getGroupList,
  inGroupPage, sendMessage, markAsRead } from '../actions';
import Preloader from '../components/Preloader';
import Message from '../components/Message';
import MessageList from '../components/MessageList';
import { UsersList, GroupInfo } from '../components/GroupHelpers';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: 'normal',
      messageOpen: false,
      selectedMessage: {}
    }

    this.onTypeText = this.onTypeText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.newMessageAdded = this.newMessageAdded.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.openMessage = this.openMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    this.props.getGroupMessages(groupId, this.props.token);
    this.props.getGroupUsers(groupId, this.props.token);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.inGroupPage(true);
  }

  componentWillReceiveProps (newProps){
    // this.forceUpdate();
    if (this.props.selectedGroup && Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      console.log(typeof newProps.match.params.groupid);
      return this.newMessageAdded(Number(newProps.match.params.groupid));
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.inGroupPage(false);
  }

  onTypeText(event) {
    this.setState({content: event.target.value});
  }

  openMessage(message) {
    console.log("Message opened");
    this.setState({
      messageOpen: true,
      selectedMessage: message
    });
    markAsRead(this.props.selectedGroup.id, message.id, this.props.token);
  }

  closeMessage() {
    console.log("Message closed");
    this.setState({
      messageOpen: false,
      selectedMessage: {}
    });
  }

  newMessageAdded(groupid) {
    return this.props.getGroupMessages(groupid, this.props.token);
  }

  scrollToBottom() {
    const messageWindow = $('#message-list');
    const messages = this.refs('#messages-ul');
    // const newMessage = messages.children('li:last-child');

    const clientHeight = messageWindow.clientHeight;
    const scrollHeight = messages.scrollHeight;
    const maxScrollTop = scrollHeight - clientHeight;

    ReactDOM.findDOMNode(messages).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // const newMessageHeight = newMessage.innerHeight();
    // const lastMessageHeight = newMessage.prev().innerHeight();
    // console.log('>>>> clientHeight: ', clientHeight);
    // console.log('>>>> scrollTop: ', scrollTop);
    // console.log('>>>> newMessageHeight: ', newMessageHeight);
    // console.log('>>>> lastMessageHeight: ', lastMessageHeight);
    // console.log('>>>> scrollHeight: ', scrollHeight);

    // if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //   console.log('Should scroll.');
    //   messages.scrollTop(scrollHeight);
    // }
  }

  sendMessage() {
    if (this.state.content) {
      this.props.sendMessage(this.props.selectedGroup.id, this.state.content, this.state.priority, this.props.token, this.newMessageAdded);
    }
  }

  render() {
    if (!this.props.groupMessagesLoading && this.props.groupMessagesFailed) {
      return <Redirect to='/' />
    }

    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return <Preloader message='Loading Group Messages...' />
    }

    // const messageList = (
    //   <div className='message-list'>
    //     {this.props.groupMessages.length > 0 ? <ul>
    //       {this.props.groupMessages.map((message) => {
    //         return <li
    //         className='message-item truncate'
    //         id={`${message.groupid}${message.id}`}
    //         key={message.id}
    //         onClick={() => this.openMessage(message)}> <strong> {message.sender}</strong><span className='grey-text timestamp'><small>{moment(message.createdAt).fromNow()}</small></span> <span className='right'><small>{message.priority} message</small></span><br />{message.content}</li>
    //       })}
    //     </ul> : <p>This group does not contain any messages</p>}
    //   </div>
    // );

    const messageList = <MessageList groupMessages={this.props.groupMessages} openMessage={this.openMessage} />

    const messageInput = (
      <div className='message-input-container'>
        <div className="row">
          <div className="input-field message-input col s12 m7">
            <textarea type="text" id="textarea1" placeholder='Type Message Here' onChange={this.onTypeText} />
          </div>
          <div className="input-field col s8 m3">
            <Row>
              <Input s={12} className='message-priority-select' type='select' 
              defaultValue='normal'
              onChange={(event) => this.setState({priority: event.target.value})}> 
                <option value='normal'>Normal</option>
                <option value='urgent'>Urgent</option>
                <option value='critical'>Critical</option>
              </Input>
            </Row>  
          </div>
          <div className="input-field col s4 m2">
            <button className="btn btn-flat white main-text-color waves-effect waves-dark" type="submit" name="action" onClick={this.sendMessage}><i className="material-icons">send</i></button>
          </div>
        </div>
      </div>
    );

    const messages = (<div className='tab-content'>
      {messageList}
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
    )

    const infoTab = <GroupInfo selectedGroup={this.props.selectedGroup} />

    const usersList = <UsersList groupUsers={this.props.groupUsers} user={this.props.user}/>

    return (
      <div className='group-page col s12 row'> 
        <div className="col s12 z-depth-2">
          <h5 className='page-header'>{this.props.selectedGroup.name} </h5>
        </div>
        <div className="col s12">
          <div className="col s12 m9">{messagesTab}</div>
          <div className="col s12 m3">{usersList}</div>
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

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token,
    isLoggedIn: state.isAuthenticated,
    groupList: state.groupList,
    groupUsers: state.groupUsers,
    groupMessagesLoading: state.groupMessagesLoading,
    groupMessagesFailed: state.groupMessagesFailed,
    selectedGroup: state.selectedGroup,
    groupMessages: state.groupMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroupMessages,
    getGroupUsers,
    getGroupList,
    inGroupPage,
    sendMessage },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
