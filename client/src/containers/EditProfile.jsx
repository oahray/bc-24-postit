import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  moment from 'moment';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingInfo: false
    };
  }

  render() {
    return (
      <div className="container">
        <div className="user-info">
          <h5>{this.props.user.username}</h5>
          <p><small>Registered <strong>{moment(this.props.user.createdAt).format('Do MMMM, YYYY, [at] h:mma')}</strong></small></p>
          <hr />
          <p><strong>About me: </strong>{this.props.user.about}</p>
          <p><strong>Email: </strong>{this.props.user.email}</p>
        </div>
        <hr />
        {/* <div className="leave-group">
          <a href="#" className="btn red lighten-1">delete account</a>
        </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
