import {Router} from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { getAllMoviesController, getMovieByIdController, addMovieController,  updateMovieController, patchMovieController, deleteMovieController} from "../controllers/movies-controllers.js";

import isValidId from "../middlewares/isValidId.js";

import { movieAddSchema, movieUpdateSchema } from "../validation/movie-schemas.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post("/", validateBody(movieAddSchema), ctrlWrapper(addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(updateMovieController));

moviesRouter.patch("/:id", isValidId, validateBody(movieUpdateSchema), ctrlWrapper(patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
