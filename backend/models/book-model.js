const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id:{
    type:Number,
  },
  title:{
    type:String
  },
  author:{
    type:String
  },
  rating:{
    type:Number
  },
  content:{
    type:String
  }
});

module.exports = mongoose.model("book", bookSchema);