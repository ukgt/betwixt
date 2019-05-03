const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
        //we need a unique flag here and maybe backend validation
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "message"}]

});



module.exports = mongoose.model('user', UserSchema);