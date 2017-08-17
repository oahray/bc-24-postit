import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.css';
import { Tabs, Tab } from 'react-materialize';
import { getGroupMessages, getGroupList } from '../actions';

class Group extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    console.log(groupId);
    this.props.getGroupMessages(groupId, this.props.token);
  }

  componentDidMount() {
    this.props.getGroupList(this.props.token);
  }

  render() {
    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return <h4> Loading... </h4>
    }

    const messages = (<div> 
        <h5> Messages </h5>
        {this.props.groupMessages ? <ul>
          {this.props.groupMessages.map((message) => {
            return <li className='message-item' key={message.id}> <p>message:{message.content}</p>
            <p>sent by: user {message.userId}</p> </li>
          })}
        </ul> : <p>This group does not have any messages</p>}
      </div>
    );

    return (
      <div className='group-page'> 
        <div className='center z-depth-2'> <h4>{this.props.selectedGroup.name} </h4> </div>
        <p>{this.props.selectedGroup.type} Groups</p>
        <p> {this.props.selectedGroup.description}</p>
        <Tabs className='tab-demo z-depth-4'>
          <Tab title="Messages">{messages}</Tab>
          <Tab title="Group Info">Test 2</Tab>
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