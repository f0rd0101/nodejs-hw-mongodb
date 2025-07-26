import express from "express";
const router = express.Router();
import { registerController } from "../controllers/auth.controller.js";
import { refreshController } from "../controllers/auth.controller.js";
import { loginController } from "../controllers/auth.controller.js";
import { loginSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { logoutController } from "../controllers/auth.controller.js";
import { registerSchema } from "../validation/auth.js";
router.post('/register', validateBody(registerSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));
router.post('/logout',ctrlWrapper(logoutController));
router.post('/refresh', ctrlWrapper(refreshController));

export default router;