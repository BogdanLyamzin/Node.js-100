import { Schema, model } from "mongoose";

import { mongooseSaveError, setUpdateSettings } from "./hooks.js";

import { emailRegexp } from "../../constants/users-constants.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", mongooseSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", mongooseSaveError);

const User = model("user", userSchema);

export default User;
