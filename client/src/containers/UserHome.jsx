import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroupList } from '../actions';
import Preloader from '../components/Preloader';

/**
 * @class
 */
export class UserHome extends Component {
  /**
   * @function componentWillMount
   * @description component lifecycle method that gets
   * called when component is about to mount
   * @returns {undefined}
   */
  componentWillMount() {
    if (this.props.user) {
      if (localStorage && typeof localStorage === 'object') {
        localStorage.setItem('x-auth', this.props.token);
      }
      this.props.getGroupList(this.props.token);
    }
  }

  /**
   * @function render
   * @returns {Object} UserHome jsx component
   */
  render() {
    if (this.props.groupListLoading) {
      return (<Preloader message='Loading your groups' />);
    }

    const showGroups = (
      this.props.groupList.length > 0 ? this.props.groupList.map(group => (
        <li className='col s12 m6 l4'
          key={group.id}>
          <div className="group-card z-depth-2">
            <span className='title'><Link to={`/groups/${group.id}/messages`}>
              {group.name} </Link></span>
            <br />
            <span className="user-home-group-desc truncate">
              <small> Description: {group.description ?
                group.description : 'None'} </small></span>
            <br />
            <span><small> Type: {group.type} </small></span>
            <span className='right'><small>Created by:
            {group.createdBy === this.props.user.username ?
                'You' : group.createdBy}</small></span> <br />
          </div>
        </li>)
      ) : (<div className='center'><p>You do not belong to any groups.
        <br /> Create one to get started. </p></div>));

    const content = (
      < div className='user-home-content'>
        <div className='row'>
          <h5 className='col s12 main-text-color page-header'> Your Groups (
          {this.props.groupList.length}) </h5>
        </div>
        <ul className='group-cards-collection row'>
          {showGroups}
        </ul>
      </div>
    );

    return (
      <div className="user-home">
        { content }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isAuthenticated,
  user: state.user,
  groupList: state.groupList,
  groupListLoading: state.groupListLoading,
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGroupList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
