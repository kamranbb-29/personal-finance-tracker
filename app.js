require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/mongodb");
const budget = require("./routes/budget");
const auth = require("./routes/auth");

const express = require("express");

const app = express();
const expense = require("./routes/expense");

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log({ msg: err.message });
  }
};
app.use("/expense", expense);

app.use("/", budget);
app.use("/", auth);

run();
