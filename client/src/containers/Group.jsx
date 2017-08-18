import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import { getGroupMessages, getGroupList } from '../actions';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    this.props.getGroupMessages(groupId, this.props.token);
  }

  componentDidMount() {
    this.props.getGroupList(this.props.token);
    console.log(this.props);
  }

  componentWillReceiveProps (newProps, newContext){
    console.log('newProps: ', newProps.match.params.groupid);
    if (Number(newProps.match.params.groupid) !== this.props.selectedGroup.id) {
      return this.props.getGroupMessages(Number(newProps.match.params.groupid), this.props.token)
    }
  }

  render() {
    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return <div className='center'> <h4> Loading... </h4> </div>
    }

    const messages = (<div className='tab-content'>
        {this.props.groupMessages ? <ul>
          {this.props.groupMessages.map((message) => {
            return <li className='message-item' key={message.id}> <p>message:{message.content}</p>
            <p>sent by: user {message.userId}</p> </li>
          })}
        </ul> : <p>This group does not have any messages</p>}
      </div>
    );

    const info = (<div className='tab-content'>
      <p>{this.props.selectedGroup.type} Group</p>
      <p> Description: {this.props.selectedGroup.description}</p>
    </div>)

    return (
      <div className='group-page'> 
        <h5 className='page-header'>{this.props.selectedGroup.name} </h5>
        <Tabs className='group-tab z-depth-1'>
          <Tab title="Messages" active>{messages}</Tab>
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
  return bindActionCreators({ getGroupMessages, getGroupList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);