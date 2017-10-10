import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import axios from 'axios';
import { logout, getGroupList } from '../actions';
import Preloader from '../components/Preloader';


class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user) {
      if (window.localStorage && typeof window.localStorage === 'object') {
        localStorage.setItem('x-auth', this.props.token);
      }
      this.props.getGroupList(this.props.token);
    }
  }

  render() {
    if (this.props.groupListLoading) {
      return <Preloader message='Loading your groups'/>
    }
    
    const showGroups = (
      this.props.groupList.length > 0 ? this.props.groupList.map((group) => {
        return (<li className='collection-item avatar'
        key={group.id}>
          <div>
            <span className='title'><Link to={`/groups/${group.id}/messages`}> 
              {group.name} </Link></span>
              <br/>
             <span><small> Description: {group.description ? group.description : 'None' } </small></span> 
            <br/> 
            <span><small> Type: {group.type} </small></span>
            <span className='right'><small>Created by: {group.createdBy === this.props.user.username ? 'You' : group.createdBy}</small></span> <br/>
          </div>
        </li>);
      }) : (<div className='center'><p>You do not belong to any groups. <br/> Create one to get started. </p></div>) );
    
    const content = (
      < div className='user-home-content'>
        <div className='row'>
          <h5 className='col s8 main-text-color'> Your Groups: </h5>
          <span className='right'>
            <h6>{this.props.groupList.length} {(this.props.groupList.length === 1) ? ' group' : ' groups'}</h6>
          </span>
        </div>
        <ul className='collection'>
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
    groupListLoading: state.groupListLoading,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGroupList, logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);