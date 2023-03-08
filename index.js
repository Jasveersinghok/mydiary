require("./connection/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
//creating routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
