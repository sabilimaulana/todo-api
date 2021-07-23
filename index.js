const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const todo = require("./src/routes/todo");

app.use(express.json());
app.use(cors());

//sequelize or database
const db = require("./models");

//routes
app.use("/api/v1", todo);

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`App running on localhost on PORT ${PORT}`);
  });
});
