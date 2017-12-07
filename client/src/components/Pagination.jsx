import React from 'react';

const Pagination = props => (<div className='col s12 center'>
    <ul className="pagination">
      <li id="previous-page"
        className={props.state.page < 2 ? 'disabled' : 'waves-effect'}
        onClick={props.previousPage}
        ><a href="#!"><i className="material-icons">chevron_left</i></a>
      </li>

      {Array.from({
        length: Math.ceil(
          props.userSearchResults.totalCount
          / props.state.limit)
      }, (v, i) => i + 1).map(i =>
        <li className={i === props.state.page ? 'active' : 'waves-effect'}
          key={i} onClick={props.onPageChange}><a id={i}>{i}</a></li>)}

      <li id="next-page" className={props.state.page < Math.ceil(
        props.userSearchResults.totalCount / props.state.limit) ?
        'waves-effect' : 'disabled'}
        onClick={props.nextPage} >
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a></li>
    </ul>
  </div>);

export default Pagination;
