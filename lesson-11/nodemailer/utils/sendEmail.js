import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

/*
const data = {
    to: "velate1125@bacaki.com",
    subject: "Test email",
    html: "<strong>Test email</strong>",
};
*/
const sendEmail = data => {
    const email = {...data, from: UKR_NET_EMAIL};
    return transport.sendMail(email);
}

export default sendEmail;