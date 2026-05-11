import jwt from "jsonwebtoken";

function getJWTSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido en el .env");
  }

  return secret;
}

export function signToken(payload: any) {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJWTSecret());
}