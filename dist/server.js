"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use(routes_1.router);
// Middleware de erro (compatível TS 5.7+)
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.status(500).json({ status: "error", message: "Internal server error" });
});
// Porta dinâmica para Vercel
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`SERVER ONLINE na porta ${PORT}`));
