import createHttpError from "http-errors";

import { getMovies, getMovie, addMovie, upsertMovie, deleteMovie } from "../services/movie-services.js";

import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import parseMovieFitlerParams from "../utils/parseMovieFilterParams.js";
import saveFileToPublicDir from "../utils/saveFileToPublicDir.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";
import env from "../utils/env.js";

import { movieFieldList } from "../constants/movies-constants.js";

const enable_cloudinary = env("ENABLE_CLOUDINARY");

export const getAllMoviesController = async (req, res) => {
    const { _id: userId } = req.user;
    const { query } = req;
    const { page, perPage } = parsePaginationParams(query);
    const { sortBy, sortOrder } = parseSortParams(query, movieFieldList);
    const filter = { ...parseMovieFitlerParams(query), userId };

    const data = await getMovies({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

    res.json({
        status: 200,
        data,
        message: "Success found movies"
    });
};

export const getMovieByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const data = await getMovie({ _id: id, userId });

    if (!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        data,
        message: `Contact with id=${id} find success`
    });
};

export const addMovieController = async (req, res) => {
    const { _id: userId } = req.user;
    let poster = "";
    if(req.file) {
        if(enable_cloudinary === "true") {
            poster = await saveFileToCloudinary(req.file, "posters");
        }
        else {
            poster = await saveFileToPublicDir(req.file, "posters");
        }
    }

    const data = await addMovie({ ...req.body, userId, poster });

    res.status(201).json({
        status: 201,
        message: "Success add movie",
        data,
    })
}

export const updateMovieController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const data = await upsertMovie({ _id: id, userId }, req.body, { upsert: true });

    const status = data.isNew ? 201 : 200;
    const message = data.isNew ? "Movie success add" : "Movie update success";

    res.json({
        status,
        message,
        data: data.value,
    })
}

export const patchMovieController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await upsertMovie({ _id: id, userId }, req.body);

    if (!result) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Movie update success",
        data: result.data,
    })
}

export const deleteMovieController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const result = await deleteMovie({ _id: id, userId });

    if (!result) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Delete movie success",
        data: result,
    })
}
