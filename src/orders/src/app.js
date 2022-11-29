const express = require('express');
const cors = require('cors');

require('./connections/mongo.db')();
const ordersRoute = require('./route/order.route');

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Orders microservice ' });
})

app.use('/api/v1/orders', ordersRoute());

app.listen(port, () => {
    console.log(`Orders MS running on port ${port}`);
});

