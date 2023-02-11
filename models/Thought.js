const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => dateFormat(timestamp, { monthLength: 'short', dateSuffix: true }), //geter function to format the date
    },
    username: { //user who created this thought
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtual: true, // enable virtuals
      getters: true, // enable getters
      versionKey: false, // remove __v
    },
    id: false,
  }
);

// create a virtual field "reactionCount" and it's getter function to return the reactions count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
