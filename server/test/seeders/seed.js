import jwt from 'jsonwebtoken';
import { User } from '../../models';

export const seedUsers = {
  registered: [
    {
      id: 1,
      name: 'user11',
      password: 'user11password',
      email: 'user1@example.com'
    },
    {
      id: 2,
      name: 'user12',
      password: 'user12password',
      email: 'user2@example.com'
    },
    {
      id: 3,
      name: 'user13',
      password: 'user13password',
      email: 'user13@example.com'
    }
  ],

  tokens: [
    
  ],

  unregistered: [
    {
      name: 'user21',
      password: 'user21password',
      email: 'user11@example.com'
    },
    {
      name: 'user22',
      password: 'user22password',
      email: 'user22@example.com'
    }
  ]
};

// export const seedGroups
