import "dotenv/config";
import express from "express";
import { session } from "./lib/prisma.js";
import passport from "./passport.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(session);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.use("/users", userRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
