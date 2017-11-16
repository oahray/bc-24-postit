import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { createNewGroup, resetCreateGroupStatus } from '../actions';

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGroups: {},
      name: '',
      description: '',
      type: 'public'
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
  }

  componentWillUnmount() {
    this.props.resetCreateGroupStatus();
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.createNewGroup(
      this.state.name, this.state.description,
      this.state.type, this.props.token);
  }

  render() {
    if (this.props.createdGroup) {
      return (<Redirect to={`/groups/${this.props.createdGroup.id}/messages`} />);
    }

    return(
      <div className='new-group-page'>
        <h5 className='page-header center'>Create New Group</h5>
        <div className='new-group-content row'>
          <form className='row col s10 offset-s1 m8 offset-m2'
          onSubmit={this.onFormSubmit}>
            <Input s={12} label="Group Name" data-length="20"
            autoFocus value={this.state.name} required
            onChange={event => this.setState({ name: event.target.value })} />

            <Input s={12} label="Group description" data-length="70"
            value={this.state.description} onChange={event =>
              this.setState({ description: event.target.value })} />

            <Row>
              <Input s={12} type='select' label="Group Privacy Type"
              defaultValue='public' onChange={event =>
                this.setState({ type: event.target.value })}>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </Input>
            </Row>

            <div className='center'>
              <Button className='white main-text-color'
              waves='teal' type='submit'> Create </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  groupList: state.groupList,
  createdGroup: state.createdGroup,
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createNewGroup, resetCreateGroupStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
