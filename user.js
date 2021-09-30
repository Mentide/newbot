var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
  userID:String,
  guild:String,
 muted: Boolean,
  muteinfo: String,
  time: String,
  guildid:String,
  unmute: Date,
  text:String,
  muteinfo1: String,
  time1: String,
  unmute1: Date,
  muteinfo2: String,
  time2: String,
  unmute2: Date,
  msg:{type:Number,default:0}
});

module.exports = mongoose.model("users", user);
 
