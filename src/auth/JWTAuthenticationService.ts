import { error } from "console";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  email: string;
  id: number;
  // isAvailible:boolean,
  iat: number;
}

interface SignServiceProps {
  email: string;
  id: number;
}

class JWTAuthenticationService {
  constructor() {}
  async JWTSignService({ email, id }: SignServiceProps): Promise<string> {
    try {
      const secret = process.env.JWT_SECRET;
      console.log("Segredo" + secret);
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }

      const payload: JWTPayload = {
        email,
        id,
        iat: Math.floor(Date.now() / 1000),
      };

      return jwt.sign(payload, secret, {
        expiresIn: "5m",
        algorithm: "HS256",
      });
    } catch (err) {
      throw new Error("Failed to generate token");
    }
  }

  async JWTValidationService(token: string) {
    try {
      const secret = process.env.JWT_SECRET || "default-secret-key";

      const decoded = jwt.verify(token, secret) as JWTPayload;

      if (!decoded) {
        throw new Error("Invalid token");
      }

      return {
        email: decoded.email,
        id: decoded.id,
        iat: decoded.iat,
        isValid: true,
      };
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired");
      }

      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }

      throw new Error("Failed to validate token");
    }
  }
}

const jWTAuthenticationService = new JWTAuthenticationService();

export { jWTAuthenticationService };
