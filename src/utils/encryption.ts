import { compare, genSalt, hash } from "bcrypt";

export async function generateHash(password: string) {
  try {
    const salt = await genSalt(2);
    return await hash(password, salt);
  } catch (error) {
    throw error;
  }
}

export async function compareHash(password: string, hash: string) {
  try {
    return await compare(password, hash);
  } catch (error) {
    throw error;
  }
}
