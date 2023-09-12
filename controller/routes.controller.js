const client = require("../db");

exports.getAllAccount = async (req, res) => {
    try {
        const getRouteQuery = `SELECT * FROM accounts`;
        const allRoutesResult = await client.query(getRouteQuery, []);
        res.json(allRoutesResult.rows);
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
