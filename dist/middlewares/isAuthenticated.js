"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(request, response, next) {
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
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Adiciona user_id no Request
        request.user_id = sub;
        return next();
    }
    catch (err) {
        return response.status(401).json({ error: "Token inválido" });
    }
}
