import express from "express";
import cors from "cors";
import pino from "pino-http";

import env from "./utils/env.js";

import { getMovies, getMovieById } from "./services/movie-services.js";

const port = env("PORT", "3000");

const startServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());

    app.get("/api/movies", async (req, res) => {
        const data = await getMovies();

        res.json({
            status: 200,
            data,
            message: "Success found movies"
        });
    })

    app.get("/api/movies/:id", async (req, res) => {
        try {
            const { id } = req.params;

            const data = await getMovieById(id);

            if (!data) {
                return res.status(404).json({
                    message: `Movie with id=${id} not found`
                })
            }

            res.json({
                status: 200,
                data,
                message: `Contact with id=${id} find success`
            })
        }
        catch (error) {
            if (error.message.includes("Cast to ObjectId failed")) {
                error.status = 404;
            }
            const { status = 500 } = error;
            res.status(status).json({
                message: error.message
            })
        }
    })

    app.use((req, res) => {
        res.status(404).json({
            message: "Not Found"
        })
    })

    app.listen(port, () => console.log(`Server running on ${port} PORT`))
}

export default startServer;