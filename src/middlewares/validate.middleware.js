
import userValidator from "../validators/user.validator.js";
import authValidator from "../validators/auth.validator.js";

const validateUser=(req,res,next)=>{
    const validation = userValidator.validateUser(req.body);
    if(!validation.isValid){
        return res.status(400).json({
            message: validation.message
        })
    }
    next();

}

const validateLogin = (req, res, next) => {
    const result = authValidator.validateLogin(req.body);

    if (!result.isValid) {
        return res.status(400).json({
            status: "fail",
            message: result.message
        });
    }

    next();
};


const validateChangePassword = (req, res, next) => {
    const result = authValidator.validateChangePassword(req.body);

    if (!result.isValid) {
        return res.status(400).json({
            status: "fail",
            message: result.message
        });
    }

    next();
};


const validateForgotPassword = (req, res, next) => {
    const result = authValidator.validateForgotPassword(req.body);

    if (!result.isValid) {
        return res.status(400).json({
            status: "fail",
            message: result.message
        });
    }

    next();
};


const validateResetPassword = (req, res, next) => {
    const result = authValidator.validateResetPassword(req.body);

    if (!result.isValid) {
        return res.status(400).json({
            status: "fail",
            message: result.message
        });
    }

    next();
};

export default {
    validateUser,
    validateLogin,
    validateChangePassword,
    validateForgotPassword,
    validateResetPassword
};