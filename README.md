[![Build Status](https://travis-ci.org/oahray/bc-24-postit.svg?branch=travis)](https://travis-ci.org/oahray/bc-24-postit)

# POSTIT
Postit is a simple applicaton that helps you connect with friends. Create groups to suit your style, add friends, write messages, and post it!


**STRUCTURE**
  - template: contains static HTML/CSS/BOOTSTRAP Template files.
  - server: contains node/express backend api powering the front-end.
  - client: contains React/Redux implementation of the front-end template (not yet implemented)


**POSTIT FRONT-END TEMPLATE**
To view the static front-end template for this project, go [here](https://oahray.github.io/bc-24-postit)


**POSTIT API ENDPOINTS**
The endpoints for the api are as listed below. These are paths that allow users do different things. With the exception of the signup and signin routes, users would need to be authenticated before using the other routes. At the moment, authentication is implemented with express-sessions.
  - GET  /api --->
      Welcome message route for POSTIT api.

  - POST /api/user/signup 
      Sign up as a new user. Include the username, password and email you would like to use, in a request to this route.

  - POST /api/user.signin
      Sign in to existing account. Include username and password in the request to this route.

  - GET  /api/user/me
      Get the details of the currently logged in user (you).

  - GET  /api/user/me/groups
      Get a list of groups you belong to.
      
  - GET  /api/user/me/messages
      Get a list of message you sent.

  - DELETE /api/user/logout
      Log out of your current session

  - POST /api/group
      Create a new group. To do this, add a title in request body.

  - POST /api/group/:groupid/user
      Add a user to a group. Repalce `:groupid` with the id of the group you wish to add users to, and the user's username to the request body. You must be a member of the group to do anything in the group.

  - GET  /api/group/:groupid/users
      Get a list of users in a particular group. Include `groupid` 

  - POST /api/group/:groupid/message
      Send message to group. It requires a `content` and `priority` in the request body. A message can have just one of three priorities - `normal`, `critical`, and `urgent`. Priority is case-insensitive.

  - GET  /api/group/:groupid/messages
      Get a list of the messages posted to a particular group.


**Note:**
`:groupid` as used in some of the routes refer to the id of the group. You must replace it with the id of the group you want.
  For example... 
Sending a GET request to /api/group/5/users, means that you would like to get a list of users in the group with an id of 5. Of course, you would need to belong to a group to do anything in it.

**POSTIT API URL**
The API for this project has been hosted on heroku at 
    https://postit-ray.herokuapp.com
This is the base url that the endpoints above should be added to. For example, to signin send a POST request with specified username, password and email fields to: 
    https://postit-ray.herokuapp.com/api/user/signup

**TO SEE TEST THIS...**
Install and use Postman.
