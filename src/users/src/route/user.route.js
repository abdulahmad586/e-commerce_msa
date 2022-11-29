const { Router } = require("express");
const userDao = require('../dao/users.dao')

module.exports = () => {
    const api = new Router();
    api.get('/', async (req, res) => {

        try {

            const { page, count, type } = req.query;

            let result = await userDao.getMany(page, count, type);
            res.status(200).json({ ok: true, ...result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            let result = await userDao.getOne(id)
            if (!result) {
                return res.status(200).json({ ok: false, message: 'User does not exist' });
            }
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.post('/', async (req, res) => {
        try {

            const { name, email, address, password, userType } = req.body;

            if (!name || !email || !address || !password) return res.status(200).json({ ok: false, message: 'A required field is missing' });

            let result = await userDao.create(name, email, address, password, userType);
            res.status(200).json({ ok: true, ...result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }

    });

    api.post('/login', async (req, res) => {

        try {
            const { email, password } = req.body;

            if (!email) return res.status(200).json({ ok: false, message: 'Email is required' });
            if (!password) return res.status(200).json({ ok: false, message: 'Password is required' });

            let result = await userDao.login(email, password);
            res.status(200).json({ ok: true, ...result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }

    });

    api.put('/', async (req, res) => {
        try {
            const { id, name, address, userType } = req.body;

            let result = await userDao.update(id, name, address, userType);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    api.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            let result = await userDao.delete(id);
            res.status(200).json({ ok: true, result });
        } catch (e) {
            res.status(500).json({ ok: false, error: e.toString() });
        }
    });

    return api;
}