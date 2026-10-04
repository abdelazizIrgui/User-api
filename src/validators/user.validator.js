


function validateUser(user) {
    const { name, age, email, password } = user;

    // Name
    if (!name || name.trim() === "") {
        return {
            isValid: false,
            message: "Name is required"
        };
    }

    // Age required
    if (age === undefined || age === null || age === "") {
        return {
            isValid: false,
            message: "Age is required"
        };
    }

    // Age must be a number
    if (isNaN(age)) {
        return {
            isValid: false,
            message: "Age must be a number"
        };
    }

    // Age range
    if (age <= 0) {
        return {
            isValid: false,
            message: "Age must be greater than 0"
        };
    }

    if (age > 120) {
        return {
            isValid: false,
            message: "Age must be less than or equal to 120"
        };
    }

    // Email
    if (!email || email.trim() === "") {
        return {
            isValid: false,
            message: "Email is required"
        };
    }

    // Password required
    if (!password || password === "") {
        return {
            isValid: false,
            message: "Password is required"
        };
    }

    // Password length
    if (password.length < 6) {
        return {
            isValid: false,
            message: "Password is very short, minimum 6"
        };
    }

    if (password.length > 8) {
        return {
            isValid: false,
            message: "Password is very long, maximum 8"
        };
    }

    return {
        isValid: true
    };
}

export default {
    validateUser
};