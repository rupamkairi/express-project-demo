import { decode, sign } from "jsonwebtoken";
import { jwtPayload, jwtPurposeEnum } from "../types";

const jwtSecret = "vnjA8}W/NpR/hdCx}Pxjn+Zyf8d7G:";

export async function generateToken(
  data: any,
  purpose: jwtPurposeEnum = jwtPurposeEnum.auth
) {
  try {
    let expIn = "1h";
    switch (purpose) {
      case jwtPurposeEnum.reset:
        expIn = "5m";
        break;

      case jwtPurposeEnum.refresh:
        expIn = "30d";
        break;

      default:
        purpose = jwtPurposeEnum.auth;
        break;
    }

    console.log(expIn);

    return sign(data, jwtSecret, { expiresIn: expIn });
  } catch (error) {
    throw error;
  }
}

export async function validateToken(token: string) {
  try {
    const data: jwtPayload = decode(token) as jwtPayload;
    return { data, isValid: true };
  } catch (error) {
    throw error;
  }
}
