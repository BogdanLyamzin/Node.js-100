import createHttpError from "http-errors";

import { getMovies, getMovieById } from "../services/movie-services.js";

export const getAllMoviesController = async (req, res) => {
    const data = await getMovies();

    res.json({
        status: 200,
        data,
        message: "Success found movies"
    });
};

export const getMovieByIdController = async (req, res) => {
    const { id } = req.params;

    const data = await getMovieById(id);

    if (!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        data,
        message: `Contact with id=${id} find success`
    });
};
