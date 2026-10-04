import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";
import transporter from "../config/mail.js";


const register = async (data) => {
    const existingUser = await User.findOne({
        email: data.email,
    });

    if (existingUser) {
        throw new AppError("Email already exists", 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await User.create({
        ...data,
        password: passwordHash,
    });
};

const login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const correctPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!correctPassword) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

const changePassword = async (userId, data) => {
    const { currentPassword, newPassword } = data;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const correctPassword = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!correctPassword) {
        throw new AppError("Current password is incorrect", 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;

    await user.save();
};

const forgotPassword = async (data) => {
    const { email } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("If the email exists, a reset link has been sent.", 404);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;

   
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    
    const resetUrl =
  `http://localhost:5000/api/auth/reset-password/${resetToken}`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "Reset Your Password",
  html: `
    <h2>Reset Password</h2>

    <p>Click the button below to reset your password.</p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>This link expires in 10 minutes.</p>
  `,
});

    

    return true;
};

const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new AppError("Invalid or expired reset token", 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
};



export default {
    register,
    login,
    forgotPassword,
    changePassword,
    resetPassword
};