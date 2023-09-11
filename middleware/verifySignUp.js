const client = require("../db");


const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    try {

        const userName = req.body.userName;
        const userEmail = req.body.userEmail;

        const searchUserNameQuery = `SELECT username FROM users WHERE username = $1 `;
        const searchUserEmailQuery = `SELECT useremail FROM users WHERE useremail = $1 `;

        const userNameResult = await client.query(searchUserNameQuery, [userName]);
        const userEmailResult = await client.query(searchUserEmailQuery, [userEmail]);


        if (userNameResult.rows.length > 0) {
            return res.status(400).send({
                message: 'UserName already exists'
            })
        } else if (userEmailResult.rows.length > 0) {
            return res.status(400).send({
                message: 'Email already exists'
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
};

module.exports = verifySignUp;