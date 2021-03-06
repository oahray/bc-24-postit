import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';

export const generateAuth = id => {
  const access = 'auth';
  const token = jwt.sign({ id, access }, process.env.MY_SUPER_SECRET,
    { expiresIn: 24 * 60 * 60 }).toString();

  return token;
};

const resetHash1 = randomstring.generate(60);
const resetHash2 = randomstring.generate(60);

export const seedUsers = {
  registered: [
    {
      id: 1101,
      username: 'user111',
      password: 'user111password',
      email: 'user111@example.com'
    },
    {
      id: 1102,
      username: 'user112',
      password: 'user112password',
      email: 'user112@example.com'
    },
    {
      id: 1103,
      username: 'user113',
      password: 'user113password',
      email: 'user113@example.com'
    },
    {
      id: 1104,
      username: 'user114',
      password: 'user114password',
      email: 'user114@example.com',
      resetHash: resetHash1,
      resetExpiresIn: Date.now() - 10000
    },
    {
      id: 1105,
      username: 'user115',
      password: 'user115password',
      email: 'user115@example.com',
      resetHash: resetHash2,
      resetExpiresIn: Date.now() + 360000
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

export const tokens = [
  generateAuth(seedUsers.registered[0].id),
  generateAuth(seedUsers.registered[1].id),
  generateAuth(seedUsers.registered[2].id),
  generateAuth(seedUsers.registered[3].id),
  generateAuth(seedUsers.registered[4].id)
];

export const seedGroups = [
  {
    id: 1011,
    name: 'Winterfell',
    type: 'private',
    description: 'Winter is coming',
    createdBy: seedUsers.registered[2].username
  },
  {
    id: 1012,
    name: 'Dorne',
    type: 'public',
    description: 'Unbroken, unbowed, unbent',
    createdBy: seedUsers.registered[2].username
  },
  {
    id: 1013,
    name: 'Dragonstone',
    type: 'private',
    description: 'Once home to Targaryens',
    createdBy: seedUsers.registered[2].username
  }
];
