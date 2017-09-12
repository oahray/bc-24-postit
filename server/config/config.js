module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "postit-dev",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "postit-test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
    "production": {
    "username": "tpgpwvuylmgwfq",
    "password": "721df25847ce113ee7306f1c673d092b788b53ea48ad8b75f797c25695f912b8",
    "database": "dcd1j0mrndfvvv",
    "host": "ec2-54-163-254-143.compute-1.amazonaws.com",
    "port": 5432,
    "dialect": "postgres"
  }
}