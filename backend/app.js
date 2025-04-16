const express = require("express");
const app = express();
const products = require("./routes/product");
const errorMiddlewares = require("./middlewares/error");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/", products);
app.use("/api", userRouter);
app.use(errorMiddlewares);

module.exports = app;
