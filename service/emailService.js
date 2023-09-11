
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email.config')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "kenneth.willms52@ethereal.email",
        pass: "mww7MfytF6HaHwaPdK"
    }
});

exports.sendMail = async (params) => {
    try {
        let info = await transporter.sendMail({
            from: emailConfig.email,
            to: params.to,
            subject: 'Hello ✔',
            html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
              <h2>Welcome to the club.</h2>
              <h4>You are officially In ✔</h4>
              <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
         </div>
          `,
        });
        return info;
    } catch (error) {
        console.log("email error", error);
    }
}