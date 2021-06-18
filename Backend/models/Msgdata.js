//accessing mongoose package
const mongoose = require("mongoose");
//database connection
mongoose.connect(
  "mongodb+srv://userone:userone@fsdfiles.ljhxf.mongodb.net/ChatDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

//schema definition
const Schema = mongoose.Schema;
//constructor
const msgSchema = new Schema({
  messages: [
    {
      sender: String,
      time: String,
      text: String,
    },
  ],
  groupid: String,
});

//model creation
var Msgdata = mongoose.model("msgdata", msgSchema);
//exporting the model
module.exports = Msgdata;
