const express = require('express');
const cors = require('cors');
require('./connections/mongo.db')();

const port = 3000;
const productsRoute = require('./route/product.route');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Products microservice ' });
})

app.use('/api/v1/products', productsRoute());

app.listen(port, () => {
    console.log(`Products MS running on port ${port}`);
});
