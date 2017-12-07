[![Build Status](https://travis-ci.org/oahray/bc-24-postit.svg?branch=develop)](https://travis-ci.org/oahray/bc-24-postit) [![Coverage Status](https://coveralls.io/repos/github/oahray/bc-24-postit/badge.svg?branch=develop)](https://coveralls.io/github/oahray/bc-24-postit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/fd7ec895fe92daa3d5b1/maintainability)](https://codeclimate.com/github/oahray/bc-24-postit/maintainability)

# POSTIT
Postit is a simple applicaton that helps you connect with friends. Create groups to suit your style, add friends, write messages, and post it!


**FEATURES**

Postit core features include:
  - Create groups and add other users to your groups
  - Real-time messaging
  - Email notifications for urgent and critical messages
You can interact with the hosted app [here](https://postit-ray.herokuapp.com)

**DEPENDENCIES**

Postit requires: 
  - [Node](nodejs.org),
  - [Git](https://git-scm.com),
  - [PostgreSQL](https://www.postgresql.org/). 
  - Other dependencies are listed in the package.json and should be installed with `npm install` on the command line.
  - Environment variables. You can find a .sample.env file in the repository root to guide you.

**API DOCUMENTATION**

The documentation for the Postit API can be found [here](https://postit-ray.herokuapp.com/api/v1/docs)

**HOW TO CONTRIBUTE**

Interested in the development of POSTIT? Awesome! You can check out the [Issues](https://github.com/oahray/bc-24-postit/issues) page, and if you find something you want to work on, let us know in the comments.

Pull Requests should:
  - Contain code written in ES6 for Javascript files.
  - Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
  - Pass existing tests, and tests you include for your contribution.

**TESTS**

Tests can be run on the command line with `npm test`

If you discover a bug, please [create an issue](https://github.com/oahray/bc-24-postit/issues/new) to report it. That is another way to contrbute to the development of Postit.

**LIMITATIONS**

While there are existing API routes for the features, there is currently no support on the front-end for users leaving groups they have been added to, or for deactivating their accounts.

**THE DEV TEAM**

- [Oare Arene](https://github.com/oahray)

**LICENCE**

Copyright © [The MIT License](./LICENCE.md)
