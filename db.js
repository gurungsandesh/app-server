const { Client } = require("pg");
const { user, host, database, password, port } = require("./config/db.config");

const client = new Client({
    user,
    host,
    database,
    password,
    port,
});

client.connect();
module.exports = client;

