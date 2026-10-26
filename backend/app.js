import "dotenv/config";
import express from "express";
import { session } from "./lib/prisma.js";
import passport from "./passport.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/", async (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${process.env.PORT}!`);
});
