import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// Interface do payload do JWT
interface Payload {
  sub: string;
}

// Declaração global para adicionar user_id ao Request
declare global {
  namespace Express {
    interface Request {
      user_id: string; // agora obrigatório
    }
  }
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Garantir que o JWT_SECRET existe
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definido");
    }

    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // Adiciona user_id no Request
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token inválido" });
  }
}
