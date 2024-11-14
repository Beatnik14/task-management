import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import * as usersController from "./controllers/user.controller";
import bodyParser from "body-parser";
import authMiddleware from "./middlewares/auth.middleware";

const app = express();
const httpServer = createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/users", usersController.register);
app.post("/api/users/login", usersController.login);
app.get("/api/user", authMiddleware, usersController.getUser);

const PORT = 4001;

mongoose.connect("mongodb://localhost:27017/task-management").then(() => {
  console.log("DB Connected");
  httpServer.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
});
