const client = require("../db");

exports.getAllAccount = async (req, res) => {
    try {
        const getRouteQuery = `SELECT * FROM accounts`;
        const allRoutesResult = await client.query(getRouteQuery, []);
        if (allRoutesResult) {
            res.json(allRoutesResult.rows);
        }
    } catch (error) {
        return res.send({
            message: "Error occured"
        })
    }
}

exports.addAccount = async (req, res) => {
    try {

        const accountName = req.body.name;

        const insertQuery = `INSERT INTO accounts (name  ) VALUES ($1)`;
        const allRoutesResult = await client.query(insertQuery, [accountName]);
        if (allRoutesResult) {
            res.send({
                message: "Account Added"
            });

        }
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}


exports.addValue = async (req, res) => {
    try {

        const accountName = req.body.name;
        const value = req.body.value;
        console.log("🚀 ~ file: routes.controller.js:43 ~ exports.addValue= ~ req.body:", req.body)

        const insertQuery = `UPDATE accounts SET value = value + $1 where name = $2`;
        const updateTable = await client.query(insertQuery, [value, accountName]);
        if (updateTable) {
            res.send({
                message: "added"
            });
        }
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}
