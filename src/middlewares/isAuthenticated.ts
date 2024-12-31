import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Playload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token not provided" });
  }
  console.log(authToken);
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Playload;
    request.user_id = sub;
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid token" });
  }
}
