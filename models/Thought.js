const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    content: {
      type: String,
      posted: { type: Date, default: Date.now },
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
