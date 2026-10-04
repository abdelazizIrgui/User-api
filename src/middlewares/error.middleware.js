import AppError from '../utils/AppError.js'

const errorHandler = (err, req, res, next) => {

    console.error(err); // اطبع الخطأ في الـ Terminal

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: err.message
    });
};

export default errorHandler;