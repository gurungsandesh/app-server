module.exports = {
    host: "localhost",
    user: "postgres",
    password: "asdf123",
    database: "postgres",
    port: "5432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

