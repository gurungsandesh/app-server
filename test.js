const client = require("./db");

const createUser = (req, res) => {

    try {
        const insertQuery = ` INSERT INTO users (username, useremail, password) VALUES ($1,$2,$3) RETURNING *`;

        const valuesToInsert = ['test user', 'test user', 'test user'];

        const result = client.query(insertQuery, valuesToInsert);
        console.log('Inserted data:', result.rows);
    } catch (error) {
        console.log("not inserted", error);
    }

};

module.exports = { createUser };