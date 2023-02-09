const { User, Thought } = require("../models");

// Get all users
// GET /api/users/
function getUsers(req, res) {
  User.find({})
    .select("-__v")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
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
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
}

// Get a single user
// GET /api/users/:userId
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .populate({ path: "thoughts", select: "-__v" })
    .populate({ path: "friends", select: "-__v" })
    .then((user) => {
      if (!user) {
        res.status(404).json(`No user with id = ${req.params.userId}`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Update user
// PUT /api/users/:userId
function updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { new: true }
  )
    .select("-__v")
    .then((user) => {
      if (!user) {
        res.status(404).json(`No user with id = ${req.params.userId}`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Delete user
// DELETE /api/users/:userId
function deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .select("-__v")
    .then((user) => {
      if (!user) {
        res.status(404).json(`No user with id = ${req.params.userId}`);
      } else {
        // if user found and deleted, delete the associated thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      }
    })
    .then(() => {
      res.status(200).json(`User id = ${req.params.userId} deleted`)
    })
    .catch((err) => res.status(500).json(err));
}

// Add a friend to a user
// POST /api/users/:userId/friends/:friendId
function addFriend(req, res) {
  User.findOne({ _id: req.params.friendId }) //look for friend id
    .then((friend) => {
      if (!friend) {
        //if friend id not found, response with error message
        res.status(404).json(`Friend id not found (${req.params.friendId})`);
      } else {
        //if friend id found, add it to user's friend list
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }
        );
      }
    })
    .then((user) => {
      if (!user) {
        //if user id not found, response with error message
        res.status(404).json(`User id not found (${req.params.userId})`);
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Remove a friend from a user
// DELETE /api/users/:userId/friends/:friendId
function removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .select("-__v")
    .then((user) => {
      if (!user) {
        res.status(404).json(`No user with id = ${req.params.userId}`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
