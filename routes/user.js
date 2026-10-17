import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { generateHash } from "../utils/password.js";

const router = Router();

router.post("/register", async (req, res) => {
  const hash = await generateHash(req.body.password);

  try {
    const user = await prisma.user.create({
      data: { username: req.body.username, passwordHash: hash },
    });

    return res.json({ message: `user ${user.username} created` });
  } catch (err) {
    return res.json({ error: err });
  }
});

export default router;
