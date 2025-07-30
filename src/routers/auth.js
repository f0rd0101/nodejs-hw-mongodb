import express from "express";
const router = express.Router();
import { registerController, requestPasswordResetController, resetPasswordController } from "../controllers/auth.controller.js";
import { refreshController } from "../controllers/auth.controller.js";
import { loginController } from "../controllers/auth.controller.js";
import { loginSchema, requestPasswordResetSchema, resetPasswordSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { logoutController } from "../controllers/auth.controller.js";
import { registerSchema } from "../validation/auth.js";
router.post('/register', validateBody(registerSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));
router.post('/logout',ctrlWrapper(logoutController));
router.post('/refresh', ctrlWrapper(refreshController));
router.post('/send-reset-email',validateBody(requestPasswordResetSchema),ctrlWrapper(requestPasswordResetController));
router.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController));

export default router;