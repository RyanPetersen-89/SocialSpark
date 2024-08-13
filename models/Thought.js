// import Schema and model from mongoose to define and create the Thought schema
const { Schema, model } = require("mongoose");
// import dayjs for date formatting
const dayjs = require("dayjs");

// import the Reaction schema to use as a nested document
const reactionSchema = require("./Reaction");

// define the Thought schema
const thoughtSchema = new Schema(
  {
    // main text of the thought, required, 1-280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // date when the thought was created, default to now, formatted with dayjs
    createdAt: {
      type: Date,
      default: Date.now,
      // dayjs used to format the date object.
      get: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY hh:mm:ss"),
    },
    // username of the creator, required
    username: {
      type: String,
      required: true,
    },
    // array of reactions using the Reaction schema
    reactions: [reactionSchema],
  },
  {
    // include virtual properties and formatted date in JSON output
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// define a virtual property to get the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  try {
    return this.reactions.length;
  } catch {
    return 0;
  }
});

// create a model for the Thought schema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;