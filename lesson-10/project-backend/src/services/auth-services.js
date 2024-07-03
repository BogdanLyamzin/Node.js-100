import User from "../db/models/User.js";

import { hashValue } from "../utils/hash.js";

export const findUser = filter => User.findOne(filter);

export const signup = async (data) => {
    const { password } = data;
    const hashPassword = await hashValue(password);
    return User.create({ ...data, password: hashPassword });
};
