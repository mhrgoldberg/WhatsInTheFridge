const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const user = require("./models/User.js");
const schema = require("./schema/schema.js");
const app = express();
const expressGraphQL = require("express-graphql");
const cors = require("cors");
const path = require('path');

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'));
  })
  app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json())


module.exports = app;
