const express = require("express");
const connectDatabase = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const route = require("./Routes/route");

const app = express();
app.use(express.json());
app.use(cors());

//This is simple test
app.get("/", async (req, res) => {
  res.send("app working");
});

app.use("/", route);

const port = process.env.PORT || 6068;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`app listening at port ${port || 6068}`);
  });
});
