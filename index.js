const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

const todo = require("./src/routes/todo");

app.use(express.json());
app.use(cors());

//sequelize or database
const db = require("./models");

//routes
app.use("/api/v1", todo);
app.use("/", (req, res) => {
  res.send("<marquee><h1>Sebuah backend oleh sabilimaulana</h1></marquee>");
});

// app.listen(PORT, () => {
//   console.log(`App running on localhost on PORT ${PORT}`);
// });

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`App running on localhost on PORT ${PORT}`);
  });
});
