const { User, Thought } = require('../models');


// Get all users 
// GET /api/users/
function getUsers(req, res) {
  res.json("Coming Soon")
}

// Create a user 
// POST /api/users/
/* example data:
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
*/
function createUser(req, res) {
  res.json("Coming Soon")
}

// Get a single user
// GET /api/users/:userId
function getSingleUser(req, res) {
  res.json("Coming Soon")
}

// Update user
// PUT /api/users/:userId
function updateUser(req, res) {
  res.json("Coming Soon")
}

// Delete user
// DELETE /api/users/:userId
function deleteUser(req, res) {
  res.json("Coming Soon")
}

// Add a friend to a user
// POST /api/users/:userId/friends/:friendId
function addFriend(req, res) {
  res.json("Coming Soon")
}

// Remove a friend from a user
// DELETE /api/users/:userId/friends/:friendId
function removeFriend(req, res) {
  res.json("Coming Soon")
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};
