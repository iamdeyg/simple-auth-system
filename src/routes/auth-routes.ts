import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/auth.middleware";
import { Request, Response } from "express";

const router = Router();
const authController = new AuthController();

router.post("/register", validateRegisterInput, (req: Request, res: Response) =>
  authController.register(req, res)
);

router.post("/login", validateLoginInput, (req: Request, res: Response) =>
  authController.login(req, res)
);

export default router;
