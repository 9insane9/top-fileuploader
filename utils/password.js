import bcrypt from "bcryptjs";

async function generateHash(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export { generateHash, validatePassword };
