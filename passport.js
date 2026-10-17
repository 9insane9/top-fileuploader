import passport from "passport";
import { Strategy } from "passport-local";
import { prisma } from "./lib/prisma.js";
import { validatePassword } from "./utils/password.js";

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return done(null, false);

    const isValid = await validatePassword(password, user.passwordHash);
    return isValid ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err);
  }
};

const stategy = new Strategy(verifyCallback);

passport.use(stategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
