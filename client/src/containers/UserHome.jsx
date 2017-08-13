import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import axios from 'axios';
import { logout, getGroupList } from '../actions';


class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user) {
      localStorage.setItem('x-auth', this.props.token);
      this.props.getGroupList(this.props.token);
    }
  }

  componentDidMount() {
    console.log('token: ', this.props.token);
  }

  logout() {
    this.props.logout()
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />
    }

    let showGroups = (
      this.props.groupList ? showGroups = (this.props.groupList.map((group) => {
        return (<li className='grey lighten-2'  
        key={group.id}>
          <Link to={`/groups/${group.id}/messages`}>
            <div>
              <p> Name: {group.name} </p>
              <p> Description: {group.description} </p>
              <p> Created by: {group.createdBy} </p>
              <p> Type: {group.type} </p>
            </div>
          </Link>
        </li>);
      })) : (<p>You do not belong to any groups. </p>) );
    
    const content = (
      < div className='center'>
        <Button onClick={() => this.logout()}>
          Log out
        </Button>
        <p> Welcome {this.props.user.username.toUpperCase()}! You are now logged in.</p>
        <ul> Your Groups:
          {showGroups}
        </ul>
      </div>
    )

    return (
      <div>
        {this.props.isLoggedIn ? content : <Redirect to="/" />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isAuthenticated,
    user: state.user,
    groupList: state.groupList,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGroupList, logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);