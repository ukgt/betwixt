const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MessageSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, ref: "user" },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("message", MessageSchema);
