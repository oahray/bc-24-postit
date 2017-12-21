import React from 'react';
import UserInfoModal from './UserInfoModal';
import ConfirmModal from './ConfirmModal';

const SearchList = props =>
  (
    <div className={`search-list-container col s10
    offset-s1`}>
      {props.state.searchTerm ? props.usersCount :
      <h6 className="center">Type in search bar to find users by username</h6>}
      <ul className='collection list-group'>
        {props.userSearchResults.users ?
          (props.userSearchResults.users).map(user =>
            <li className="collection-item avatar grey lighten-3"
              key={user.id}>
              <img
                src={user.imageUrl ? user.imageUrl :
                  '/images/no-pic.png'} className="circle" />
              <span className="title">
                <UserInfoModal user={user} />
              </span>
              <p><small>{user.about}</small></p>
              <span className='secondary-content'>
                <ConfirmModal modalId={`add-user${user.id}`}
                  className='add-user-icon main-text-color'
                  confirmText={`Sure you want to add ${user.username} to your group?`}
                  callback={() => props.addUser(user.username)}
                  triggerLabel={<i className='material-icons'>person_add</i>}
                />
              </span>
            </li>) : null}
      </ul>
    </div>
  );

export default SearchList;
