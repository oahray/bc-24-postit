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

  render() {
    let showGroups = (
      this.props.groupList ? showGroups = (this.props.groupList.map((group) => {
        return (<li className='collection-item avatar'  
        key={group.id}>
          <div>
            <span className='title'><Link to={`/groups/${group.id}/messages`}> 
              {group.name} </Link></span>
              <br/>
             <span> Description: {group.description ? group.description : 'None' } </span> 
            <br/> 
            <span> Type: {group.type} </span>
            <span className='right'>Created by: {group.createdBy}</span> <br/>
          </div>
        </li>);
      })) : (<p>You do not belong to any groups. </p>) );
    
    const content = (
      < div className='user-home-content'>
        <div className='row'>
          <h5 className='col s8'> Your Groups: </h5>
          <span className='right'><h6>{this.props.groupList.length} {(this.props.groupList.length === 1) ? ' group' : ' groups'}</h6></span>
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
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGroupList, logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);