const client = require("../db");


exports.signup = async (req, res, next) => {
    try {

        const insertQuery = ` INSERT INTO users (username , password) VALUES ($1,$2)`;
        const userInfo = [req.body.username, req.body.password];

        const result = await client.query(insertQuery, userInfo);

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
        const userEmail = req.body.username;
        const reqPassword = req.body.password;

        if (!userEmail || !reqPassword) {
            return res.send({
                message: "please insert correct info"
            })
        }

        const searchUserEmailQuery = `SELECT username FROM users WHERE username = $1 `;
        const searchPasswordQuery = `SELECT password FROM users WHERE username = $1 `;

        const searchUserEmailResult = await client.query(searchUserEmailQuery, [userEmail])
        const searchUserPasswordResult = await client.query(searchPasswordQuery, [userEmail])
        console.log("🚀 ~ file: auth.controller.js:43 ~ exports.signin= ~ searchUserPasswordResult:", searchUserPasswordResult.rows[searchUserPasswordResult.rows.length - 1].password)

        if (searchUserEmailResult.rows.length > 0) {
            if (searchUserPasswordResult.rows[searchUserPasswordResult.rows.length - 1].password === reqPassword) {
                return res.send({
                    message: "User found ",
                    data: {
                        username: searchUserEmailResult.rows[0].username
                    }
                })
            } else {
                return res.status(500).send({
                    message: "Password not matched"
                })
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
