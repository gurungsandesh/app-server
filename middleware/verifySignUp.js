const client = require("../db");


const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    try {

        const userName = req.body.username;

        const reqPassword = req.body.password;

        if (!userName || !reqPassword) {
            return res.send({
                message: "please insert correct info"
            })
        }

        const searchUserNameQuery = `SELECT username FROM users WHERE username = $1 `;

        const userNameResult = await client.query(searchUserNameQuery, [userName]);

        if (userNameResult.rows.length > 0) {
            return res.status(400).send({
                message: 'UserName already exists'
            })
        } else {
            next();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const checkDuplicateAccounts = async (req, res, next) => {

    try {

        const accountName = req.body.name;

        if (!accountName) {
            return res.send({
                message: "please insert correct info"
            })
        }

        const searchUserNameQuery = `SELECT name FROM accounts WHERE name = $1 `;

        const userNameResult = await client.query(searchUserNameQuery, [accountName]);

        if (userNameResult.rows.length > 0) {
            return res.status(400).send({
                message: 'Accounts already exists'
            })
        } else {
            next();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const checkAccountExists = async (req, res, next) => {

    try {

        const accountName = req.body.name;

        if (!accountName) {
            return res.send({
                message: "please insert correct info"
            })
        }

        const searchUserNameQuery = `SELECT name FROM accounts WHERE name = $1 `;

        const userNameResult = await client.query(searchUserNameQuery, [accountName]);

        if (userNameResult.rows.length === 0) {
            return res.status(400).send({
                message: 'Account not found'
            })
        } else {
            next();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkDuplicateAccounts: checkDuplicateAccounts,
    checkAccountExists: checkAccountExists
};

module.exports = verifySignUp;