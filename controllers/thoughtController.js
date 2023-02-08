const { thought, Thought } = require('../models');

// Get all thoughts 
// GET /api/thoughts/
function getThoughts(req, res) {
  res.json("Coming Soon")
}

// Create a thought 
// POST /api/thoughts/
/* example data:
{
  "thoughtText": "Here's a cool thought...",
  "thoughtname": "lernantino",
  "thoughtId": "5edff358a0fcb779aa7b118b"
}
*/
function createThought(req, res) {
  res.json("Coming Soon")
}

// Get a single thought
// GET /api/thoughts/:thoughtId
function getSingleThought(req, res) {
  res.json("Coming Soon")
}

// Update thought
// PUT /api/thoughts/:thoughtId
function updateThought(req, res) {
  res.json("Coming Soon")
}

// Delete thought
// DELETE /api/thoughts/:thoughtId
function deleteThought(req, res) {
  res.json("Coming Soon")
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
