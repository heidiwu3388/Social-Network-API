const { User, Thought } = require('../models');


// Get all users 
// GET /api/users/
function getUsers(req, res) {
  User.find({})
    .select("-__v")
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err))
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
  User.create(req.body)
    .select("-__v")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
}

// Get a single user
// GET /api/users/:userId
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .populate({ path: 'thoughts', select: '-__v' })
    .populate({ path: 'friends', select: '-__v' })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json(`No user with id = ${req.params.userId}`);
      }
    })
    .catch((err) => res.status(500).json(err));
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
