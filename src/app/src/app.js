const express = require('express');
const cors = require('cors');
const microservicesMiddleware = require('./microservices.middleware');

// const msMiddleware = require('./microservices.middleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/../www/`));
app.use(express.urlencoded({ extended: true }));

app.use(microservicesMiddleware);

app.listen(3000, () => {
    console.log("App Server running on port 3000");
});
