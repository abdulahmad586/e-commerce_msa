const express = require('express');
const cors = require('cors');
require('./connections/mongo.db')();

const port = 3000;
const userRoute = require('./route/user.route');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Users microservice ' });
})

app.use('/api/v1/users', userRoute());

app.listen(port, () => {
    console.log(`Users MS running on port ${port}`);
});
