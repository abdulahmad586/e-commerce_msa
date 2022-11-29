const { Router } = require("express");
const productDao = require('../dao/products.dao')

module.exports = () => {
    const api = new Router();
    api.get('/', async (req, res) => {
        try {
            const { page, count } = req.query;
            let result = await productDao.getMany(page, count);
            res.status(200).json({ ok: true, ...result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            let result = await productDao.getOne(id)
            if (!result) {
                res.status(200).json({ ok: false, message: 'Product does not exist' });
            }
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.post('/', async (req, res) => {
        try {

            const { name, category, quantity, price } = req.body;

            let result = await productDao.create(name, category, quantity, price);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }

    });

    api.put('/', async (req, res) => {
        try {
            const { id, name, quantity, price } = req.body;

            let result = await productDao.update(id, name, quantity, price);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            let result = await productDao.delete(id);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    return api;
}