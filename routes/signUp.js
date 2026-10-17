import { Router } from "express";

const signUpRouter = Router();

signUpRouter.post("/", async (req, res) => {
  res.send(200).end();
});

export default signUpRouter;
