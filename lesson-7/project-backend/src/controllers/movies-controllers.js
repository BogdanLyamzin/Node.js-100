import createHttpError from "http-errors";

import { getMovies, getMovieById, addMovie, upsertMovie, deleteMovie } from "../services/movie-services.js";

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

export const addMovieController = async(req, res)=> {
    const data = await addMovie(req.body);

    res.status(201).json({
     status: 201,
     message: "Success add movie",
     data,
    })
}

export const updateMovieController = async(req, res)=> {
    const {id} = req.params;
    const data = await upsertMovie({_id: id}, req.body, {upsert: true});

    const status = data.isNew ? 201 : 200;
    const message = data.isNew ? "Movie success add" : "Movie update success";

    res.json({
        status,
        message,
        data: data.value,
    })
}

export const patchMovieController = async(req, res)=> {
    const {id} = req.params;
    const result = await upsertMovie({_id: id}, req.body);

    if(!result) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Movie update success",
        data: result.data,
    })
}

export const deleteMovieController = async(req, res)=> {
    const {id} = req.params;

    const result = await deleteMovie({_id: id});

    if(!result) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Delete movie success",
        data: result,
    })
}
