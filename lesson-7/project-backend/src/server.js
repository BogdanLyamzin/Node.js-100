import express from "express";
import cors from "cors";
import pino from "pino-http";

import moviesRouter from "./routers/movies-router.js";

import notFoundHanler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import env from "./utils/env.js";

const port = env("PORT", "3000");

const startServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    // app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use("/api/movies", moviesRouter);

    app.use(notFoundHanler);
    app.use(errorHandler);

    app.listen(port, () => console.log(`Server running on ${port} PORT`))
}

export default startServer;
