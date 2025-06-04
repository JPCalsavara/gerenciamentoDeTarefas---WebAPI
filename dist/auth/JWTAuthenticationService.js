"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jWTAuthenticationService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAuthenticationService {
    constructor() { }
    async JWTSignService({ email, id }) {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined");
            }
            const payload = {
                email,
                id,
                iat: Math.floor(Date.now() / 1000),
            };
            return jsonwebtoken_1.default.sign(payload, secret, {
                expiresIn: "5m",
                algorithm: "HS256",
            });
        }
        catch (err) {
            throw new Error("Failed to generate token");
        }
    }
    async JWTValidationService(token) {
        try {
            const secret = process.env.JWT_SECRET || "default-secret-key";
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (!decoded) {
                throw new Error("Invalid token");
            }
            return {
                email: decoded.email,
                id: decoded.id,
                isValid: true,
            };
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error("Token expired");
            }
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error("Invalid token");
            }
            throw new Error("Failed to validate token");
        }
    }
}
const jWTAuthenticationService = new JWTAuthenticationService();
exports.jWTAuthenticationService = jWTAuthenticationService;
