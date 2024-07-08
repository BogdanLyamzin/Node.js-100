import bcrypt from "bcrypt";

export const hashValue = value => bcrypt.hash(value, 10);

export const compareHash = (value, hash) => bcrypt.compare(value, hash);
