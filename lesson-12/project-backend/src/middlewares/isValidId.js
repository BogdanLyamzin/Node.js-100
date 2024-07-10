import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return next(createHttpError(404, `${id} not valid id`));
    }
    next();
};

export default isValidId;
