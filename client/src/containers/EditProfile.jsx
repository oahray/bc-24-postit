import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingInfo: false
    }
  }

  render() {
    return (
      <div className='container'>
        <h5>{this.props.user.username}</h5>
        <p><strong>About me: </strong>{this.props.user.about}</p> 
        <p><strong>Email: </strong>{this.props.user.email}</p>
        <p><strong>Mobile: </strong>{this.props.user.phone ? this.props.user.phone : 'None'}</p>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);