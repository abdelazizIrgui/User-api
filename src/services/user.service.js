
import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

const getAllUsers = async (page = 1, limit = 10, search = "") => {
    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

    const [users, totalUsers] = await Promise.all([
        User.find(filter)
            .skip(skip)
            .limit(limit),

        User.countDocuments(filter)
    ]);

    return {
        users,
        pagination: {
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit)
        }
    };
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async ({ name, age, email,password }) => {
    const emailExist = await User.findOne({ email });

      if (emailExist) {
          throw new AppError("Email already exists", 400);
        }
    return await User.create({
        name,
        age,
        email,
        password: await bcrypt.hash(password, 10)
    });
};

const updateUser = async (id, data) => {

    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};