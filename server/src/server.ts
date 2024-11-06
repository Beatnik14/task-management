import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";

const app = express();
const httpServer = createServer(app);

const PORT = 4001;

mongoose.connect("mongodb://localhost:27017/task-management").then(() => {
  console.log("DB Connected");
  httpServer.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
});
