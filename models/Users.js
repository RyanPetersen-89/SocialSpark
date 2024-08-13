// import Schema and model from mongoose
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // regex to validate email address
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Email not valid",
      ],
    },
    // array of  Thought ObjectIds
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    // array of ObjectIds referencing the User model
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // include virtual properties in JSON output
    toJSON: {
      virtuals: true,
    },
    // do not include the default id field
    id: false,
  }
);

// virtual property to get the count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;