import express from "express";
import authController from "../controllers/auth.controller.js";
import protect from "../middlewares/validationToken.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/register",
  validateMiddleware.validateUser,
  authController.register
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post(
  "/login",
  validateMiddleware.validateLogin,
  authController.login
);


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  protect,
  authController.me
);


/**
 * @swagger
 * /auth/change-password:
 *   patch:
 *     summary: Change current user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password or validation error
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/change-password",
  protect,
  validateMiddleware.validateChangePassword,
  authController.changePassword
);


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Reset request processed
 *       404:
 *         description: User not found
 */
router.post(
  "/forgot-password",
  validateMiddleware.validateForgotPassword,
  authController.forgotPassword
);


/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using reset token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: 8f7a9c123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset token
 */
router.post(
  "/reset-password/:token",
  validateMiddleware.validateResetPassword,
  authController.resetPassword
);

export default router;