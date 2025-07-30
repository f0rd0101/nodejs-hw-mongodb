import nodemailer from "nodemailer";
import { getEnvVar } from "./getEnvVar.js";

const transporter = nodemailer.createTransport({
    host: getEnvVar("SMTP_HOST"),
    port: Number(getEnvVar("SMTP_PORT")),
    secure: false,
    auth:{
        user: getEnvVar("SMTP_USER"),
        pass: getEnvVar("SMTP_PASSWORD"),
    },

});

export function sendMail(mail){
 return transporter.sendMail(mail);
};