const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
  user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
  },
  name: {
    type: String,
  },
  title:{
    type:String
  },
  description:{
    type:String,
  },
  tag:{
    type:String,
    default:"general"
  }
});
const Notes  = mongoose.model("Notes",notesSchema)
module.exports = Notes