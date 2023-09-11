const client = require("../db");

exports.routes = async (req, res) => {
    try {
        const insertRouteQuery = ` INSERT INTO routes (busno , busname, fromplace, toplace, date, seats) VALUES ($1,$2,$3, $4, $5,$6)`;
        const routesInfo = [req.body.busno, req.body.busname, req.body.fromplace, req.body.toplace, req.body.date, req.body.seats];


        const searchRelativeRoutes = `SELECT * FROM routes WHERE busno=$1 AND date=$2`
        const routesResult = await client.query(searchRelativeRoutes, [req.body.busno, req.body.date,]);

        if (routesResult.rows.length > 0) {
            return res.status(400).send({
                message: 'Bus route already exists'
            })
        } else {
            const result = await client.query(insertRouteQuery, routesInfo)
            if (result) {
                return res.send({
                    message: "Routes Registered"
                })
            }
        }
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}


exports.getRoutes = async (req, res) => {
    try {
        const getRouteQuery = `SELECT * FROM routes`;
        const allRoutesResult = await client.query(getRouteQuery, []);
        res.json(allRoutesResult.rows);
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}

exports.getRoutesById = async (req, res) => {
    try {

        const searchRelativeRoutes = `SELECT * FROM routes WHERE busno=$1 AND date=$2`
        const routesResult = await client.query(searchRelativeRoutes, [req.body.busno, req.body.date,]);

        if (routesResult.rows.length > 0) {
            return res.json(routesResult.rows);
        } else {
            return res.send({
                message: "Routes Not found"
            })
        }
    } catch (error) {
        return res.send({
            message: "Error occured"
        })
    }
}

exports.getFromPlace = async (req, res) => {
    try {
        const getColumnForm = `SELECT fromplace FROM routes`;

        const routesResult = await client.query(getColumnForm, []);

        if (routesResult.rows.length > 0) {
            return res.json(routesResult.rows);
        }
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}

exports.getToPlace = async (req, res) => {
    try {
        const getColumnForm = `SELECT toplace FROM routes`;

        const routesResult = await client.query(getColumnForm, []);

        if (routesResult.rows.length > 0) {
            return res.json(routesResult.rows);
        }
    } catch (error) {
        console.log("error is", error);
        return res.send({
            message: "Error occured"
        })
    }
}