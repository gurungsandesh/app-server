const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const client = require("../db");
const config = require("../config/auth.config");
const optGenerator = require("../service/otpGenerator");
const email = require("../service/emailService")

exports.signup = async (req, res, next) => {
    try {

        const otpGenerated = optGenerator.generateOTP();

        const insertQuery = ` INSERT INTO users (username , useremail, password, role, otp) VALUES ($1,$2,$3, $4, $5)`;
        const userInfo = [req.body.userName, req.body.userEmail, bcrypt.hashSync(req.body.password), req.body.role, otpGenerated];

        const result = await client.query(insertQuery, userInfo);
        console.log("🚀 ~ file: auth.controller.js:16 ~ exports.signup= ~ result:", result.rows)

        const sendEmail = await email.sendMail({
            to: req.body.userEmail,
            OTP: otpGenerated,
        })

        if (sendEmail) {
            console.log("send Eamil 0", sendEmail);
        }

        if (result) {
            return res.send({
                message: "New user created properly"
            })
        }

    } catch (error) {
        console.log("error is", error);
        return res.status(400).send({
            message: "User not created "
        })
    }
    next();
};

exports.signin = async (req, res, next) => {
    try {
        const userEmail = req.body.userEmail;
        const reqPassword = req.body.password;

        if (!userEmail || !reqPassword) {
            return res.send({
                message: "please insert correct info"
            })
        }

        const searchUserEmailQuery = `SELECT username FROM users WHERE username = $1 `;
        const searchPasswordQuery = `SELECT password FROM users WHERE username = $1 `;
        const serachStatusQuery = `SELECT status FROM users WHERE username = $1 `;

        const searchUserEmailResult = await client.query(searchUserEmailQuery, [userEmail])
        const searchUserPasswordResult = await client.query(searchPasswordQuery, [userEmail])
        const searchStatusResult = await client.query(serachStatusQuery, [userEmail])

        if (searchStatusResult.rows.length > 0) {
            console.log("search result is", searchStatusResult.rows.length);
        }


        if (searchUserEmailResult.rows.length > 0) {
            if (searchUserPasswordResult.rows.length > 0) {


                const isPasswordValid = bcrypt.compareSync(
                    reqPassword,
                    searchUserPasswordResult.rows[0].password
                )

                if (!isPasswordValid) {
                    return res.send({
                        message: "Invalid password"
                    })
                }

                const token = jwt.sign({ userEmail: userEmail },
                    config.secret,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 86400, // 24 hours
                    });

                return res.status(200).send({
                    email: userEmail,
                    accessToken: token
                });
            }
        } else {
            return res.status(500).send({
                message: 'user not found'
            })
        }
    } catch (error) {
        console.log("not inserted", error);
    }
    next()

};
