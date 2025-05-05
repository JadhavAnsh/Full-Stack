const errorMiddleware = (err, req, res, next) => {
    try {
        // Copy the error object and retain its properties
        let error = { ...err, message: err.message };

        // Handle specific error types
        if (err.name === "CastError") {
            error.message = `Invalid ${err.path}: ${err.value}`;
            error.statusCode = 400;
        }
        if (err.code === 11000) {
            error.message = "Duplicate field value entered";
            error.statusCode = 400;
        }
        if (err.name === "ValidationError") {
            error.message = Object.values(err.errors).map((val) => val.message).join(", ");
            error.statusCode = 400;
        }
        if (err.name === "JsonWebTokenError") {
            error.message = "Invalid token. Please log in again.";
            error.statusCode = 401;
        }
        if (err.name === "TokenExpiredError") {
            error.message = "Your token has expired. Please log in again.";
            error.statusCode = 401;
        }

        // Send the error response
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    } catch (error) {
        // Pass unexpected errors to the default error handler
        next(error);
    }
};

module.exports = errorMiddleware;