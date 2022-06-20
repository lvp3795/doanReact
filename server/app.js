require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./db/connect");

const productRouter = require("./routes/products");
const login = require("./routes/auth");
const upload = require("./routes/upload");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", login);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/upload", upload);
app.use("/images", express.static("./images"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
