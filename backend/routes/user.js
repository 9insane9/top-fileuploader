import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { generateHash } from "../utils/password.js";
import passport from "../passport.js";

const router = Router();

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }

  return res.json({
    id: req.user.id,
    username: req.user.username,
  });
});

router.post("/register", async (req, res) => {
  const hash = await generateHash(req.body.password);

  try {
    const user = await prisma.user.create({
      data: { username: req.body.username, passwordHash: hash },
    });

    return res.json({ message: `User ${user.username} created!` });
  } catch (err) {
    return res.json({ error: err });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.json({ message: `Logged in as ${req.user.username}!` });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    return res.json({ message: "Successfully logged out!" });
  });
});

export default router;
