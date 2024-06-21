import { Schema, model } from "mongoose";

const movieShema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["film", "serial"],
        default: "film"
    }
});

const Movie = model("movie", movieShema);
// category => categories
// mouse => mice

export default Movie;