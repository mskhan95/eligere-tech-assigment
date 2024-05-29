const express = require("express");
const connectDatabase = require("./config/db");
const cors = require("cors");
const route = require("./Routes/route");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("app working");
});

app.use("/", route);

port = 3000;
connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`app listening at port ${port}`);
  });
});
