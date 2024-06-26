import { Schema, model } from "mongoose";

import { typeList, releaseYearRegexp } from "../../constants/movies-constants.js";

import { mongooseSaveError, setUpdateSettings } from "./hooks.js";

const movieShema = new Schema({
    title: {
        type: String,
        required: [true, "title must be"],
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: typeList,
        default: "film"
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    releaseYear: {
        type: String,
        match: releaseYearRegexp,
        required: true,
    }
}, { versionKey: false, timestamps: true });

movieShema.post("save", mongooseSaveError);

movieShema.pre("findOneAndUpdate", setUpdateSettings);

movieShema.post("findOneAndUpdate", mongooseSaveError);

const Movie = model("movie", movieShema);

export default Movie;
