import {Router} from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";

import { getAllMoviesController, getMovieByIdController, addMovieController,  updateMovieController, patchMovieController, deleteMovieController} from "../controllers/movies-controllers.js";

import isValidId from "../middlewares/isValidId.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(addMovieController));

moviesRouter.put("/:id", isValidId,  ctrlWrapper(updateMovieController));

moviesRouter.patch("/:id", isValidId, ctrlWrapper(patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
