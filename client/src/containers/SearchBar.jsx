import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    state: {
      username: ''
    }
  }

  render() {
    return (
      <form class='search-wrapper input-field card row'>
        <div class="search-input col s10">
          <input id="search" type="search"/>
          <label for="search">Search Username</label>
        </div>
        <span><i class='material-icons suffix'>search</i></span>
      </form>
    )
  }
}