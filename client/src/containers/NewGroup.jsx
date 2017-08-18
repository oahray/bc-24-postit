import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

export default class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfGroups: 0,
      name: '',
      description: '',
      type: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    // const myInterval = setInterval(() => console.log('Group type', this.state), 8000);
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('New group component state: ', this.state);
  }

  render() {
    return(
      <div className='new-group-page'>
        <h5 className='page-header'>Create New Group</h5>
        <div className='new-group-content row'>
          <form className='row col s6 offset-s3' onSubmit={this.onFormSubmit}>
            <Input s={12} label="Group Name" autoFocus value={this.state.name} required onChange={event => this.setState({ name: event.target.value})} />

            <Input s={12} label="Group description" value={this.state.description} onChange={event => this.setState({ description: event.target.value})} />

            <Row>
              <Input s={12} type='select' label="Group Privacy Type" defaultValue='public' onChange={(event) => this.setState({type: event.target.value})}>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </Input>
            </Row>

            <div className='center'>
              <Button className='white teal-text' waves='teal' type='submit'> Create </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}