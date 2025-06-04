import { JWTPayload } from "./auth/JWTAuthenticationService";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
