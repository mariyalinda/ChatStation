//accessing mongoose package
const mongoose = require("mongoose");
//database connection
mongoose.connect(
  "mongodb+srv://userone:userone@fsdfiles.ljhxf.mongodb.net/ChatDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  { useFindAndModify: false }
);

//schema definition
const Schema = mongoose.Schema;
//constructor
const grpSchema = new Schema({
  name: String,
  des: String,
  memno: Number,
  members: [],
});

//model creation
var Grpdata = mongoose.model("grpdata", grpSchema);
//exporting the model
module.exports = Grpdata;
