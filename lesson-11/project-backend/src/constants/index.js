import path from "node:path";

export const sortOrderList = ["asc", "desc"];

export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFETIME = 7 * 24 * 3600 * 1000;

export const TEMPLATES_DIR = path.resolve("src", "templates");
