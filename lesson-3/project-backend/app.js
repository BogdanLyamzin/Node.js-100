import express from "express";
import cors from "cors";

import movies from "./movies.js";

const app = express();

app.use(cors());

// const corsMiddleware = cors();
// app.use(corsMiddleware);

/*
const cors = options => {
    const middelware = (req, res, next)=> {
        // apply options
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    }

    return middleware;
}
*/

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// })

app.get("/api/products", (req, res) => {
    res.json([]);
})

app.get("/api/movies", (req, res) => {
    res.json(movies);
})

app.use((req, res)=> {
    res.status(404).json({
        status: 404,
        message: "Not Found"
    })
})

app.listen(3000, () => console.log("Server running on 3000 PORT"));