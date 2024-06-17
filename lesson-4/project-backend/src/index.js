import initMongoDB from "./db/initMongoDB.js";
import startServer from "./server.js";

const bootstrap = async()=> {
    await initMongoDB();
    startServer();
}

bootstrap();

