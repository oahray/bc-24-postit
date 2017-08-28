import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.searchUser(this.state.username);
  }

  searchUser(username) {
    if (username) {
      const nextPath = `/groups/${this.props.selectedGroup.id}/addusers?u=${username}&p=${1}`;
      this.props.searchUsers(username, nextPath);
    }
  }

  render() {
    return (
      <form class='search-wrapper card row' 
      onSubmit={this.onFormSubmit}>
        <div class="search-input col s10">
          <input id="search" 
          placeholder='Search Username' value={this.state.username} type="text"
          onChange={(event) => { this.setState({
            username: event.target.value
          }); this.searchUser(event.target.value)}}/>
        </div>
        <a class="waves-effect waves-teal btn-flat"><i class='material-icons teal-text' 
        onClick={this.onFormSubmit}>search</i></a>
      </form>
    )
  }
}