const nodemailer = require("nodemailer");

const sendMail = async (options) => {
    // transporter configs
    const transporter = await nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL_ADDRESS,
            pass: process.env.SMTP_PASSWORD
        }
    });
    // message params
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transporter.sendMail(message);
}

module.exports = { sendMail }