import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "668c26bd863f86f5e962da34",
    email: "velate1125@bacaki.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const tokenPayload = jwt.verify(token, JWT_SECRET);
    // console.log(tokenPayload);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGMyNmJkODYzZjg2ZjVlOTYyZGEzNCIsImVtYWlsIjoidmVsYXRlMTEyNUBiYWNha2kuY29tIiwiaWF0IjoxNzIwNDYxMTEzLCJleHAiOjE3MjA1NDc1MTN9.k7QRoGT2mota84G8Knj4Au8GrcRW6ZV6OpjxMsp38Ga";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}