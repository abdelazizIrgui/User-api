function validateLogin(data) {
    const { email, password } = data;

    if (!email || email.trim() === "") {
        return {
            isValid: false,
            message: "Email is required"
        };
    }

    if (!password || password === "") {
        return {
            isValid: false,
            message: "Password is required"
        };
    }

    return {
        isValid: true
    };
}


function validateChangePassword(data) {
    const { currentPassword, newPassword } = data;

    if (!currentPassword || currentPassword === "") {
        return {
            isValid: false,
            message: "Current password is required"
        };
    }

    if (!newPassword || newPassword === "") {
        return {
            isValid: false,
            message: "New password is required"
        };
    }

    if (newPassword.length < 6) {
        return {
            isValid: false,
            message: "New password is very short, minimum 6"
        };
    }

    if (newPassword.length > 8) {
        return {
            isValid: false,
            message: "New password is very long, maximum 8"
        };
    }

    if (currentPassword === newPassword) {
        return {
            isValid: false,
            message: "New password must be different from current password"
        };
    }

    return {
        isValid: true
    };
}


function validateForgotPassword(data) {
    const { email } = data;

    if (!email || email.trim() === "") {
        return {
            isValid: false,
            message: "Email is required"
        };
    }

    return {
        isValid: true
    };
}


function validateResetPassword(data) {
    const { newPassword } = data;

    if (!newPassword || newPassword === "") {
        return {
            isValid: false,
            message: "New password is required"
        };
    }

    if (newPassword.length < 6) {
        return {
            isValid: false,
            message: "New password is very short, minimum 6"
        };
    }


    return {
        isValid: true
    };
}


export default {
    validateLogin,
    validateChangePassword,
    validateForgotPassword,
    validateResetPassword
};