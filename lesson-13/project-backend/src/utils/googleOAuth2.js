import { OAuth2Client } from "google-auth-library"
import {readFile} from "node:fs/promises";
import path from "node:path";
import createHttpError from "http-errors";

import env from "./env.js";

const googleAuthSettingsPath = path.resolve("google-auth.json");
const googleAuthSettings = JSON.parse(await readFile(googleAuthSettingsPath));

const clientId = env("GOOGLE_AUTH_CLIENT_ID");
const clientSecret = env("GOOGLE_AUTH_CLIENT_SECRET");

const googleOAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: googleAuthSettings.web.redirect_uris[0]
});

export const validateGoogleOAuthCode = async (code) => {
    const response = await googleOAuthClient.getToken(code);
    if(!response.tokens.id_token) {
        throw createHttpError(401, "Google OAuth code invalid");
    }

    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: response.tokens.id_token
    });

    return ticket;
}

export const getGoogleOAuthName = ({given_name, family_name}) => {
    if(!given_name) return "User";

    const name = family_name ? `${given_name} ${family_name}` : given_name;

    return name;
}

export const generateAuthUrl = ()=> {
    return googleOAuthClient.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ]
    })
}
