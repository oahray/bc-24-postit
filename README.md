[![Build Status](https://travis-ci.org/oahray/bc-24-postit.svg?branch=develop)](https://travis-ci.org/oahray/bc-24-postit) [![Coverage Status](https://coveralls.io/repos/github/oahray/bc-24-postit/badge.svg?branch=develop)](https://coveralls.io/github/oahray/bc-24-postit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/fd7ec895fe92daa3d5b1/maintainability)](https://codeclimate.com/github/oahray/bc-24-postit/maintainability) [![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# POSTIT
Postit is a simple applicaton that helps you connect with friends. Create groups to suit your style, add friends, write messages, and post it!

## Table of Contents
- [API Documentation](#api-documentation)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Tests](#tests)
- [Limitations](#limitations)
- [How to contribute](#how-to-contribute)
- [The Dev Team](#the-dev-team)
- [Licence](#licence)
- [FAQs](#faqs)

## API Documentation

The documentation for the Postit API can be found [here.](https://postit-ray.herokuapp.com/api/v1/docs)

## Key Features
##### Users
  - Users can create new accounts to access all other features.
  - Users can create groups and add other users to those groups.

##### Groups
  - Groups are communication channels that allow members post messages to be read by other users.
  - Groups can be created as public and private groups.
  - Only users who are members of a group can post messages to those groups.

##### Authentication
  - Postit uses JWT for authentication.
  - On successfull sign up or sign in, the user receives a token in the `x-auth` header which can be used to authenticate requests to protected endpoints.
  For a list of endpoints that are protected and those that are not, see our [documentation](https://postit-ray.herokuapp.com/api/v1/docs).

##### Real time updates
  - The client side implementation includes socket.io, which helps ensure that the app updates in real time. You can interact with the hosted app [here.](https://postit-ray.herokuapp.com)

##### Email Notifications
  - Users get email notifications when an urgent or a critical message is posted by other members in groups to which they belong.

##### Password recovery
  - Forgot your password? No problem. Users can request a password reset, and get a mail with reset instructions.

## Technology Stack

Postit uses the PERN (PostgreSql, Express, ReactJs, NodeJs) stack.

#### Client Side: 
  - Front-end implementation in REACT/REDUX
  - Styling with SASS 
  - WEBPACK for bundling

#### Server Side:
  - Server-side implementation is built on NODE, with an
      EXPRESS server and SEQUELIZE as the ORM for
      querying the POSTGRES DB.

#### Authentication and Code Base Organization
  - Written in ES6 (ECMAScript 2015)
  - BABEL transpiler 
  - Json Web Tokens (JWT) for authentication.  
    
#### Code Quality
  - Uses ESLINT which was configured to use Airbnb-base rules for ensuring code quality.


## Dependencies
To use Postit, you would need: 
  - [NodeJS](https://nodejs.org) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [PostgreSQL](https://www.postgresql.org/) - a popular object-relational database management system (ORDBMS).
  - [Sequelize](http://docs.sequelizejs.com) - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
  - Other dependencies are listed in the package.json and should be installed with `npm install` on the command line.
  - Environment variables defined in a `.env` file. You can find a `.sample.env` file in the repository root to guide you on setting up your `.env` file.

## Installation
To get started, 
- Clone this repository to your local machine using https://github.com/oahray/bc-24-postit.git
- Navigate to the root of the cloned local repository.
- Create a file named `.env` using the `.sample.env` file - located on the repository root folder - as a guide.
- Run `npm install` to install the dependencies.
- Run `npm start` to run the application.

## Tests
Three kinds of tests have been included:
- API Server tests
- Client side tests for react/redux implementation
- End-to-end tests to assure User Experience

##### Server tests
Server side tests can be run on the command line with `npm test`

##### Client tests
Client side tests can be run on the command line with `npm run client-test`

##### End-to-End tests
End-to-End tests can be run on the command line with `npm run e2e-test`. For this to work however, you would need to:
- create a `bin` folder in the root of your branch,
- download and move [chromedriver](https://chromedriver.storage.googleapis.com/index.html?path=2.34/) and [selenium-server-standalone](http://selenium-release.storage.googleapis.com/index.html) binaries to the folder. Be sure to download the chrome driver that corresponds to your local machine. 
- start the api server (on e2e mode) on a separate terminal with `npm run e2e-server`.
- Run the End-to-End tests can be run on the command line with `npm run e2e-test`

If you discover a bug while testing or using app, please [create an issue](https://github.com/oahray/bc-24-postit/issues/new) to report it. That is a way to contribute to the development of Postit.

## Limitations
Currently...
- users cannot join groups on their own by searching and then joining (for public groups), or requesting to join (for private groups). This means that users can only be part of groups that they create or are added to.
- there is no difference between public and private groups. In future versions, groups type would determine to what extent members and other users can interract with the group.

## How to Contribute

Interested in the development of POSTIT? Awesome! You can check out the [Issues](https://github.com/oahray/bc-24-postit/issues) page, and if you find something you want to work on, let us know in the comments.

Pull Requests should:
  - Contain code written in ES6 for Javascript files.
  - Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
  - Pass all tests.

## The Dev. Team
- [Oare Arene](https://github.com/oahray)

## Licence
Copyright © [The MIT License](./LICENCE.md)

## FAQs
#### What is Postit?
Postit is a communication platform that allows users create signup, create groups, add users to their groups and interact with other group members by posting messages to their groups.
    
#### How do I use it?
You can signup for an account on https://postit-ray.herokuapp.com to use the client side implementation built on the API. If you are a developer and wish to use the API, see the [documentation](https://postit-ray.herokuapp.com/api/v1/docs) to learn how to start and what endpoints are available.

#### Is Postit an Open-Source Application?
Yes it is. 
    
#### Who can contribute?
Anyone! To contribute, simply raise a PR with your contribution. Only PRs that meet the standard would be considered. For more details on PR conventions for the Postit project, see the [How to contribute](#how-to-contribute) section of this README, and the [wiki](https://github.com/oahray/bc-24-postit/wiki) for this repository.
    
#### What language was used to develop this application?
This project is a full stack Javascript application
    
#### Am I permitted to clone this project for personal use?
See [The MIT License](./LICENCE.md) for the permissions available to you.
    
