import mongoose from "mongoose";

import env from "../utils/env.js";

const initMongoDB = async()=> {
    try {
        const user = env("MONGODB_USER");
        const password = env("MONGODB_PASSWORD");
        const url = env("MONGODB_URL");
        const db = env("MONGODB_DB");
        const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(DB_HOST);
        console.log("Database connection success");
    }
    catch(error) {
        console.log(`Error connect to database ${error.message}`);
        throw error;
    }
}

export default initMongoDB;