import {Router} from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";

import { getAllMoviesController, getMovieByIdController } from "../controllers/movies-controllers.js";

import isValidId from "../middlewares/isValidId.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(getMovieByIdController));

export default moviesRouter;
