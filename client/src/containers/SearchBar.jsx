import React, { Component } from 'react';

/**
 * @class SearchBar
 */
export default class SearchBar extends Component {
  /**
   * @component
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /**
   * @param {*} event
   * @return {undefined}
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.searchUser(this.state.username);
  }

  /**
   * @param {string} username
   * @returns {undefined}
   */
  searchUser(username) {
    if (username) {
      const nextPath = `/groups/${
        this.props.selectedGroup.id
      }/addusers?u=${username}&p=${1}`;
      this.props.searchUsers(username, nextPath);
    }
  }

  /**
   * @returns {jsx} SearchBar component
   */
  render() {
    return (
      <form class='search-wrapper card row'
      onSubmit={this.onFormSubmit}>
        <div class="search-input col s10">
          <input id="search"
          placeholder='Search Username' value={this.state.username} type="text"
          onChange={(event) => {
            this.setState({
              username: event.target.value
            }); this.searchUser(event.target.value);
          }}/>
        </div>
        <a class="waves-effect waves-teal btn-flat">
          <i class='material-icons main-text-color'
          onClick={this.onFormSubmit}>search</i></a>
      </form>
    );
  }
}
