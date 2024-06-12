import express from "express";
import cors from "cors";
import pino from "pino-http";

import env from "./utils/env.js";

import movies from "./db/movies.js";

const port = env("PORT", "3000");

const startServer = ()=> {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());
    
    app.get("/api/movies", (req, res)=> {
        res.json(movies);
    })

    app.use((req, res)=> {
        res.status(404).json({
            message: "Not Found"
        })
    })

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`))
}

export default startServer;