import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import { getGroupMessages, getGroupList, inGroupPage } from '../actions';
import Preloader from '../components/Preloader';

class Group extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    this.props.getGroupMessages(groupId, this.props.token);
  }

  componentDidMount() {
    this.props.inGroupPage(true);
  }

  componentWillReceiveProps (newProps){
    this.forceUpdate();
    console.log('newProps: ', newProps.match.params.groupid);
    if (this.props.selectedGroup && Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      return this.props.getGroupMessages(Number(newProps.match.params.groupid), this.props.token)
    }
  }

  componentWillUnmount() {
    this.props.inGroupPage(false);
  }

  render() {
    if (this.props.groupMessagesLoading | !this.props.selectedGroup) {
      return <Preloader message='Loading Group Messages...' />
    }

    const messageList = (<div className='message-list'>
        {this.props.groupMessages.length > 0 ? <ul>
          {this.props.groupMessages.map((message) => {
            return <li className='message-item' key={message.id}> <p>message:{message.content}</p>
            <p>sent by: user {message.userId}</p> </li>
          })}
        </ul> : <p>This group does not have any messages</p>}
      </div>
    );

    const messagesTab = (<div className='tab-content'>
      {messageList}
      <div>
      </div>
    </div>)

    const info = (<div className='tab-content'>
      <p>{this.props.selectedGroup.type} Group</p>
      <p> Description: {this.props.selectedGroup.description}</p>
    </div>)

    return (
      <div className='group-page'> 
        <h5 className='page-header'>{this.props.selectedGroup.name} </h5>
        <Tabs className='group-tab z-depth-1'>
          <Tab title="Messages" active>{messagesTab}</Tab>
          <Tab title="Group Info">{info}</Tab>
        </Tabs>
        <div id="search-results" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    isLoggedIn: state.isAuthenticated,
    groupList: state.groupList,
    groupMessagesLoading: state.groupMessagesLoading,
    selectedGroup: state.selectedGroup, 
    groupMessages: state.groupMessages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGroupMessages, getGroupList, inGroupPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);