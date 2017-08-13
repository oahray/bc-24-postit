import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Group extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        <h4 className='center'> {this.props.selectedGroup.name} </h4>
        <p>{this.props.selectedGroup.type} group</p>
        <p> {this.props.selectedGroup.description}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedGroup: {
      name: 'Our Super Secret Groups',
      description: 'no visitors allowed in here',
      type: 'private'
    }
  }
}

export default connect(mapStateToProps)(Group);