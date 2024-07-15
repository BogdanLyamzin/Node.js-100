import initMongoDB from "./db/initMongoDB.js";
import startServer from "./server.js";

import createDirIfNotExists from "./utils/createDirIfNotExists.js";

import { TEMP_UPLOAD_DIR, PUBLIC_DIR, PUBLIC_POSTERS_DIR } from "./constants/index.js";

const bootstrap = async()=> {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(PUBLIC_DIR);
    await createDirIfNotExists(PUBLIC_POSTERS_DIR);
    startServer();
}

bootstrap();


