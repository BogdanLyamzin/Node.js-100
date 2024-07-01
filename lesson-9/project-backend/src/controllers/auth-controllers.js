import createHttpError from "http-errors";

import { signup, findUser } from "../services/auth-services.js";

import { compareHash } from "../utils/hash.js";

export const signupController = async(req, res)=> {
    const {email} = req.body;
    const user =  await findUser({email});
    if(user) {
        // throw createHttpError(401, "Email or password invalid");
        throw createHttpError(409, "Email already in use");
    }

    const newUser = await signup(req.body);

    const data = {
        name: newUser.name,
        email: newUser.email,
    };

    res.status(201).json({
        status: 201,
        data,
        message: "User signup successfuly",
    })
}

export const signinController = async(req, res)=> {
    const {email, password} = req.body;
    const user = await findUser({email});
    if(!user) {
        throw createHttpError(404, "Email not found");
        // throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await compareHash(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Password invalid");
        // throw createHttpError(401, "Email or password invalid");
    }

    const accessToken = "122.4q52.44444";
    const refreshToken = "2132.4151.33";

    res.json({
        accessToken,
        refreshToken,
    })
}
