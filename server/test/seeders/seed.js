import jwt from 'jsonwebtoken';
import { User } from '../../models';

export const generateAuth = (id) => {
  return jwt.sign({ id, access: 'auth' },
    process.env.MY_SUPER_SECRET, { expiresIn: 24 * 60 * 60 }).toString();
}

export const seedUsers = {
  registered: [
    {
      id: 101,
      username: 'user111',
      password: 'user111password',
      email: 'user111@example.com'
    },
    {
      id: 102,
      username: 'user112',
      password: 'user112password',
      email: 'user112@example.com'
    },
    {
      id: 103,
      username: 'user113',
      password: 'user113password',
      email: 'user113@example.com'
    }
  ],

  unregistered: [
    {
      username: 'user21',
      password: 'user21password',
      email: 'user11@example.com'
    },
    {
      username: 'user22',
      password: 'user22password',
      email: 'user22@example.com'
    }
  ]
};

export const seedGroups = [
  {
    id: 11,
    name: 'Winterfell',
    type: 'private',
    description: 'Winter is coming',
    createdBy: seedUsers.registered[2].username
  },
  {
    id: 12,
    name: 'Dorne',
    type: 'public',
    description: 'Unbroken, unbowed, unbent',
    createdBy: seedUsers.registered[2].username
  },
  {
    id: 13,
    name: 'Dragonstone',
    type: 'private',
    description: 'Once home to Targaryens',
    createdBy: seedUsers.registered[2].username
  }
]

export const tokens = [
  generateAuth(seedUsers.registered[0].id),
  generateAuth(seedUsers.registered[1].id),
  generateAuth(seedUsers.registered[2].id)
]
