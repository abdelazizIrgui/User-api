import asyncHandler from "express-async-handler";
import authService from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user,
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);

    res.status(200).json({
        status: "success",
        message: "Login successful",
        token: result.token,
        user: result.user,
    });
});

const me = asyncHandler(async (req, res) => {
    res.status(200).json({
        status: "success",
        user: req.user,
    });
});

const changePassword = asyncHandler(async (req, res) => {
    await authService.changePassword(req.user.id, req.body);

    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const data = await authService.forgotPassword(req.body);

    res.status(200).json({
        status: "success",
        message: "Reset token generated successfully",
        data,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    await authService.resetPassword(
        req.params.token,
        newPassword
    );

    res.status(200).json({
        status: "success",
        message: "Password reset successfully",
    });
});

export default {
    register,
    login,
    me,
    changePassword,
    forgotPassword,
    resetPassword
};