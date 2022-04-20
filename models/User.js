const { Schema, model } = require("mongoose");
const friendSchema = require("./Friend");
const thoughtSchema = require("./Thought");

// Schema to create User model
const studentSchema = new Schema({
  first: {
    type: String,
    required: true,
    max_length: 50,
  },
  last: {
    type: String,
    required: true,
    max_length: 50,
  },
  friends: [friendSchema],
  thoughts: [thoughtSchema],

  toJSON: {
    getters: true,
  },
});

const User = model("user", userSchema);

module.exports = User;
