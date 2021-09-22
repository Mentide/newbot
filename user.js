var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user = new mongoose.Schema({
  userID: String,
  left: Boolean,
  channel: { type: Number, default: null},
  reason: { type: String, default: 'не в муте'},
 
  muted: Boolean,
  muteinfo: String,
  time: String,
  unmute: Date,
  guild: String,

});

module.exports = mongoose.model("users", user);