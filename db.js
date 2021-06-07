const mongoose = require("mongoose");
//setting up our database

mongoose
  .connect(
    "mongodb+srv://mypassword:mypassword@cluster0.wyqhk.mongodb.net/mymodel?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.log(err));
