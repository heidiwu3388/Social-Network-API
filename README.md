# Social-Network-API
This is a back-end application providing APIs for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list.

## Table of Contents
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Built With](#built-with)
* [License](#license) 

## Demo

Please watch this video [https://www.youtube.com/watch?v=RAhfnYqq0Yw](https://www.youtube.com/watch?v=RAhfnYqq0Yw) for the demo of the application.

## Installation
1. Install MongoDB in your local machine, please refer to [MongoDB documentation](https://www.mongodb.com/docs/manual/installation/) for installation procedures.

2. Start with cloning this repo:
    ```
    $ git clone https://github.com/heidiwu3388/Social-Network-API.git
    ```

3. Install all dependencies
    ```
    $ cd Social-Network-API

    $ npm install
    ```

4. Seed the database (optional)
    ```
    $ npm run seed
    ```
5. run the application
    ```
    $ npm start
    ```

## Usage
- While the server is running, it is ready for any REST client to make the API calls.
- The front end is not included in this project, but the APIs can be called by using a REST client of your choice (such as Insomnia and Postman).
- The following endpoints are provided:
    - Users
        - GET All Users
            - GET http://localhost:3001/api/users/
        - GET Single User by Id
            - GET http://localhost:3001/api/users/:userId
        - CREATE User
            - POST http://localhost:3001/api/users/
            - the request body should look like this:
                ```
                {
                    "username": "lernantino",
                    "email": "lernantino@gmail.com"
                }
                ```
        - UPDATE User
            - PUT http://localhost:3001/api/users/:userId
            
        - DELETE User and delete the associated thoughts
            - DELETE http://localhost:3001/api/users/:userId

    - Friends
        - Add Friend (add friendId to user's friend list)
            - POST http://localhost:3001/api/users/:userId/friends/:friendId
        
        - Remove Friend (remove friendId form user's friend list)
            - DELETE http://localhost:3001/api/users/:userId/friends/:friendId
    
    - Thoughts
        - GET All Thoughts
            - GET http://localhost:3001/api/thoughts
        - GET Thought by Id
            - GET http://localhost:3001/api/thoughts/:id
        - CREATE Thought and add thought id to user's thought list
            - POST http://localhost:3001/api/thoughts
            - the request body should look like this:
                ```
                {
                    "thoughtText": "Here's a cool thought...",
                    "username": "lernantino",
                    "userId": "5edff358a0fcb779aa7b118b"
                }
                ```
        - UPDATE Thought
            - PUT http://localhost:3001/api/thoughts/:thouthgId
            
        - DELETE Thought
            - DELETE http://localhost:3001/api/thoughts/:thouthgId
    
    - Reactions
        - Add Reaction
            - POST http://localhost:3001/api/thoughts/:thouthgId/reactions
        - Remove Reaction
            - DELECT http://localhost:3001/api/thoughts/:thouthgId/reactions/:reactionId

## Built With
- Server:
    - Node.js
    - Express.js
- Database:
    - MongoDB
    - Mongoose


## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) 