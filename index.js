const express = require("express");
var cors = require('cors');

const app = express();
const port = 3000;

const authRouter = require('./routes/authRoutes');
const routesRouter = require('./routes/userRoutes');


app.use(cors())
app.use(express.json());
app.use('/', authRouter);
app.use('/', routesRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});







