import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import applyMiddlewares from "./middlewares/middlewares.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDB();
applyMiddlewares(app);

app.listen(port, () => {
  console.log("Server listening on port ", port);
});
