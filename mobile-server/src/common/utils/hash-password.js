import bcrypt from 'bcrypt';

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    next(error);
  }
}

export default hashPassword;
