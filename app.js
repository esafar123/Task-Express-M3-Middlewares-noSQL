const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");

connectDb();
app.use(express.json());

app.use("/posts", postsRoutes);

// not found

app.use((req, res, next) => {
  res.status(404).json("not found");
  next();
});

// error ahndler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ msg: error });
  next();
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
