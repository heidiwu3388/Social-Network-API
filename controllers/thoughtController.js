const { thought, Thought, User } = require('../models');

// Get all thoughts 
// GET /api/thoughts/
function getThoughts(req, res) {
  Thought.find({})
    .select("-__v")
    .then((thoughts) => res.status(200).json(thoughts))
    .catch((err) => res.status(500).json(err));
}

// Create a thought 
// POST /api/thoughts/
/* example data:
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
*/
function createThought(req, res) {
  User.findById(req.body.userId) //check if the user exists
    .then((user) => {
      if (!user) { // if no user is found, send 404
        res.status(404).json( `User id not found! (${req.body.userId})` );
        return;
      } 
      // create a new thought
      Thought.create(req.body)
        .then((thought) => {  
          // add the thought id to the user's thought list
          return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            )
          .select("-__v")
          .populate({ path: "thoughts", select: "-__v" });
        })
        .then((user) => {
          // return the updated user document
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
}

// Get a single thought
// GET /api/thoughts/:thoughtId
function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) => {
      if (!thought) {
        res.status(404).json(`No thought with id = ${req.params.thoughtId}`);
      } else {
        res.status(200).json(thought);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Update thought
// PUT /api/thoughts/:thoughtId
function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { new: true }
  )
    .select("-__v")
    .then((thought) => {
      if (!thought) {
        res.status(404).json(`No thought with id = ${req.params.thoughtId}`);
      } else {
        res.status(200).json(thought);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Delete thought
// DELETE /api/thoughts/:thoughtId
function deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) => {
      if (!thought) { // if thought not found, send 404
        res.status(404).json(`No thought with id = ${req.params.thoughtId}`);
      } else {
        res.status(200).json(`Thought deleted 🎉`);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Add a reaction to a thought
// POST /api/thoughts/:thoughtId/reactions
function addReaction(req, res) {
  res.json("Coming Soon")
}

// Remove a reaction from a thought
// DELETE /api/thoughts/:thoughtId/reactions/:reactionsId
function removeReaction(req, res) {
  res.json("Coming Soon")
}

module.exports = {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};
