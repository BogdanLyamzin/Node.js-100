import { HttpError } from "http-errors";

const errorHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {
        const { status, message, errors } = error;
        res.status(status).json({
            status,
            message,
            data: errors || error,
        });
        return;
    }
    const {status = 500, message = 'Something went wrong'} = error;
    res.status(status).json({
        status,
        message,
        data: error.message,
    });
};

export default errorHandler;
