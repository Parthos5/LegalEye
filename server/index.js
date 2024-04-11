require('dotenv').config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const axios = require('axios');
const cors = require("cors");
const port = 5000;
const mongoDB = require("./db");
mongoDB();
// const JWT_SECRET = "MYNAMEISPARTHANDAMAWESOMEHEREIAM"


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/", require("./Routes/userfunction"));
// app.use("/", require("./Routes/tasks"));
// app.use("/",require("./Routes/spotify"));

app.use("/govt", require("./Routes/govt"))
app.use("/student", require("./Routes/student"))

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});