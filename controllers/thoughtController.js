// import models
const { Thought, User } = require('../models');

// Get all thoughts 
// GET /api/thoughts/
function getThoughts(req, res) {
  Thought.find({})
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
        res.status(404).json( `🚫 User id not found! (${req.body.userId})` );
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
          .populate({ path: "thoughts"});
        })
        .then((user) => {
          // return the updated user document
          res.status(200).json({message: "Thought created, and attached to the user! 🎉", user: user});
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
}

// Get a single thought
// GET /api/thoughts/:thoughtId
function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) => {
      if (!thought) {
        res.status(404).json(`🚫 Thought id not found! (${req.params.thoughtId})`);
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
    .then((thought) => {
      if (!thought) {
        res.status(404).json(`🚫 Thought id not found! (${req.params.thoughtId})`);
      } else {
        res.status(200).json({message: "Thought updated! 🎉", thought: thought});
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Delete thought
// DELETE /api/thoughts/:thoughtId
function deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) => {
      if (!thought) { // if thought not found, send 404
        res.status(404).json(`🚫 Thought id not found! (${req.params.thoughtId})`);
      } else {
        res.status(200).json(`Thought deleted 🎉 (${req.params.thoughtId})`);
      }
    })
    .catch((err) => res.status(500).json(err));
}

// Add a reaction to a thought
// POST /api/thoughts/:thoughtId/reactions
function addReaction(req, res) {
  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
    .then((thought) => {
      if (!thought) { //if thought id not found, send 404
        res.status(404).json(`🚫 Thought id not found! (${req.params.thoughtId})`);
      } else {
        res.status(200).json({message: "Reaction added to the thought! 🎉", thought: thought});
      } 
    })
    .catch((err) => res.status(500).json(err));
}

// Remove a reaction from a thought
// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
function removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: {reactionId: req.params.reactionId } } },
    { new: true }
  )
    .then((thought) => {
      if (!thought) { // if thought id not found, send 404
        res.status(404).json(`🚫 Thought id not found! (${req.params.thoughtId})`);
      } else {
        res.status(200).json({message: "reaction removed from the thought! 🎉", thought: thought});
      }
    })
    .catch((err) => res.status(500).json(err));
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
