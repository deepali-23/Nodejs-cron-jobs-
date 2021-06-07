const mongoose = require("mongoose");

const myschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
//creating our collection
const Table = mongoose.model("mymodel", myschema);
module.exports = Table;
