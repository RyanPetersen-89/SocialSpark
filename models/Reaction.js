const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs"); // import dayjs for date formatting

const reactionSchema = new Schema(
  {
    // unique ID for each reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    // date the reaction was created, default to now, formatted with dayjs
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY hh:mm:ss"),
    },
  },
  {
    // include virtuals and getters in JSON output, exclude the id field
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;