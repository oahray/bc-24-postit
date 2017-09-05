import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Tabs, Tab, Row, Input } from 'react-materialize';
import { getGroupMessages, getGroupUsers, getGroupList, inGroupPage, sendMessage } from '../actions';
import Preloader from '../components/Preloader';
import Message from '../components/Message';

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
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    this.props.getGroupMessages(groupId, this.props.token);
    this.props.getGroupUsers(groupId, this.props.token);
  }

  componentDidMount() {
    this.props.inGroupPage(true);
  }

  componentWillReceiveProps (newProps){
    // this.forceUpdate();
    if (this.props.selectedGroup && Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      console.log(typeof newProps.match.params.groupid);
      return this.newMessageAdded(Number(newProps.match.params.groupid));
    }
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
  }

  closeMessage() {
    console.log("Message closed");
    this.setState({
      messageOpen: false,
      selectedMessage: {}
    })
  }

  newMessageAdded(groupid) {
    return this.props.getGroupMessages(groupid, this.props.token)
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

    const messageList = (
      <div className='message-list'>
        {this.props.groupMessages.length > 0 ? <ul>
          {this.props.groupMessages.map((message) => {
            return <li 
            className='message-item truncate' 
            id={`${message.groupid}${message.id}`}
            key={message.id}
            onClick={() => this.openMessage(message)}> <strong> {message.sender}</strong><span className='grey-text timestamp'><small>{moment(message.createdAt).fromNow()}</small></span> <span className='right'><small>{message.priority} message</small></span><br />{message.content}</li>
          })}
        </ul> : <p>This group does not contain any messages</p>}
      </div>
    );

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
            <button className="btn btn-flat white teal-text waves-effect waves-dark" type="submit" name="action" onClick={this.sendMessage}><i className="material-icons">send</i></button>
          </div>
        </div>
      </div>
    );

    const messages = <div className='tab-content'>
      {messageList}
      {messageInput}
    </div>

    const openMessage = (
      <div className="row col s12">
        <div className="tab-content col s12 l4 push-l8">
          <Message message={this.state.selectedMessage} 
          closeMessage={this.closeMessage} user={this.props.user}/>
        </div>
        <div className="col l8 pull-l4 hide-on-med-and-down">
          {messages}
        </div> 
      </div>  
    );

    const messagesTab = (
      this.state.messageOpen ? openMessage : messages
    )

    const infoTab = (<div className='tab-content'>
      <div className='group-info'>
        {this.props.selectedGroup.type === 'private' ? <p className='edit-group-info-text grey lighten-1 white-text center'><span className='yellow-text lighten-2'><i className='material-icons'>info</i></span> Since <em><strong>{this.props.selectedGroup.name}</strong></em> is a private group, only <strong>{this.props.selectedGroup.createdBy.toUpperCase()}</strong> can edit it's info. </p> : <p className='edit-group-info-text green white-text center'>Edit</p>}
         <p> Created by {this.props.selectedGroup.createdBy.toUpperCase()} on {moment(this.props.selectedGroup.createdAt).format('Do MMMM, YYYY, h:mma')} </p> 
        <p> Description: {this.props.selectedGroup.description}</p>
      </div>
    </div>)

    const usersTab = (
      <div>
        <h5>Users List <span className=''><small>({this.props.groupUsers.length} {this.props.groupUsers.length === 1 ? 'member' : 'members'})</small></span></h5>
        <div>
          <ul>
            {this.props.groupUsers.map((user) => <li key={user.id}>{user.username} {user.username === this.props.user.username ? '(you)' : ''}</li>)}
          </ul>
        </div>
        <h6>Leave Group...</h6>
      </div>
    )

    return (
      <div className='group-page'> 
        <h5 className='page-header'>{this.props.selectedGroup.name} </h5>
        <Tabs className='group-tab z-depth-1'>
          <Tab title="Messages" active>{messagesTab}</Tab>
          <Tab title="Group Info">{infoTab}</Tab>
          <Tab title="Group Users">{usersTab}</Tab>
        </Tabs>
      </div>
    )
  }
}

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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGroupMessages, getGroupUsers, getGroupList, inGroupPage, sendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);