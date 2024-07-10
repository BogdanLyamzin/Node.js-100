import { Schema, model } from "mongoose";

import { mongooseSaveError, setUpdateSettings } from "./hooks.js";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    },
}, {versionKey: false, timestamps: true});

sessionSchema.post("save", mongooseSaveError);

sessionSchema.pre("findOneAndUpdate", setUpdateSettings);

sessionSchema.post("findOneAndUpdate", mongooseSaveError);

const Session = model("session", sessionSchema);

export default Session;
