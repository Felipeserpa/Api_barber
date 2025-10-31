import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    // 🛑 CORREÇÃO 1: Remova o 'return' antes de response.status(401).end()
    response.status(401).end();
    return; // Adicione 'return' sozinho para sair da função
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // Você deve ter adicionado a tipagem 'user_id' ao Request para isso funcionar
    // Ex: declare module 'express' { export interface Request { user_id: string; } }
    request.user_id = sub;

    return next(); // Mantenha o 'return' para chamar a próxima função
  } catch (err) {
    // 🛑 CORREÇÃO 2: Remova o 'return' antes de response.status(401).end()
    response.status(401).end();
    return; // Adicione 'return' sozinho para sair da função
  }
}
