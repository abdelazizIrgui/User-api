import userService from "../services/user.service.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

const getAllUsers = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await userService.getAllUsers(
        page,
        limit,
        search
    );

    res.status(200).json({
        status: "success",
        ...result
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await userService.getUserById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);

    res.status(201).json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
    const updatedUser =
await userService.updateUser(
    req.params.id,
    req.body
);

    if (!updatedUser) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        message: "User deleted successfully"
    });
});

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};