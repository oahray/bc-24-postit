[![Build Status](https://travis-ci.org/oahray/bc-24-postit.svg?branch=develop)](https://travis-ci.org/oahray/bc-24-postit)
[![Coverage Status](https://coveralls.io/repos/github/oahray/bc-24-postit/badge.svg?branch=develop)](https://coveralls.io/github/oahray/bc-24-postit?branch=develop)

# POSTIT
Postit is a simple applicaton that helps you connect with friends. Create groups to suit your style, add friends, write messages, and post it!


**STRUCTURE**
  - template: contains static HTML/CSS/MaterializeCSS Template files.
  - server: contains node/express backend api powering the front-end.
  - client: contains React/Redux implementation of the front-end template (not yet implemented)


**POSTIT API ENDPOINTS**
Details about the Postit API and it's endpoints can be found in the [documentation](https://oahray.github.io/postit-slate)

**POSTIT API URL**
This project (both API and client) has been hosted on heroku at 
    https://postit-ray.herokuapp.com
This is the base url that the endpoints above should be added to. For example, to signin send a POST request with specified username, password and email fields to: 
    https://postit-ray.herokuapp.com/api/user/signup

**TO TEST RUN THE API...**
Install and use Postman.
