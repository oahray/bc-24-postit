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
    if (this.state.username) {
      this.searchUser(this.state.username);
    }
  }

  searchUser(username) {
    console.log(`User searched for ${username}`);
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