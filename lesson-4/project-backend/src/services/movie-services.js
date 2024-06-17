import Movie from "../db/models/Movie.js";

export const getMovies = () => Movie.find();

export const getMovieById = id => Movie.findById(id);