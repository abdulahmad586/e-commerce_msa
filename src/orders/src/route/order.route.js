const { Router } = require("express");
const orderDao = require('../dao/order.dao');
const { sendRequest } = require("../util/http_client.util");

module.exports = () => {
    const api = new Router();
    api.get('/', async (req, res) => {
        try {
            const { page, count } = req.query;
            let result = await orderDao.getMany(page, count);
            res.status(200).json({ ok: true, ...result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            let result = await orderDao.getOne(id)
            if (!result) {
                return res.status(200).json({ ok: false, message: 'Order not found' });
            }
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.post('/', async (req, res) => {
        try {

            const { customer, product, orderQuantity } = req.body;

            console.log("Order quantity", orderQuantity);

            let productResponse = await sendRequest(`/api/v1/products/${product}`, 'products', 3000);

            if (!productResponse.ok) {
                return res.status(200).json({ ok: false, message: `Unable to get product at the moment, please try again later` });
            }

            if (!productResponse.result) {
                return res.status(200).json({ ok: false, message: `Product is no longer available` });
            }

            const { _id, price, quantity } = productResponse.result;


            if (orderQuantity > quantity) {
                return res.status(200).json({ ok: false, message: `Sorry, you ordered more than we have in stock, we currently only have ${productData.quantity} of this product in stock` });
            }

            let subtotal = price * quantity;

            let result = await orderDao.create(customer, product, orderQuantity, price, subtotal);

            let newQuantity = quantity - orderQuantity;
            let updateProduct = await sendRequest(`/api/v1/products/`, 'products', 3000, 'PUT', { id: _id, quantity: newQuantity });
            console.log("Product updated ", updateProduct);

            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }

    });

    api.put('/', async (req, res) => {
        try {
            const { id, quantity, price } = req.body;

            let result = await orderDao.update(id, { quantity, price });
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            let result = await orderDao.delete(id);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    return api;
}