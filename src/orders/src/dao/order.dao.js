const Order = require('../model/order.model');

class OrdersDao {

    #totalOrders = 0;

    constructor() {
        this.#init();
    }

    async #init() {
        try {
            this.#totalOrders = await Order.count();
        } catch (e) {
            console.log("Error >> OrdersDao.#init >>", e);
        }
    }

    async create(customer, product, quantity, price, subtotal) {
        try {
            const order = new Order({ customer, product, quantity, price, subtotal })
            await order.save();
            this.#totalOrders++;
            return order;
        } catch (err) {
            console.log("Error >> OrdersDao.create >>", err);
            throw err.message;
        }
    }

    async getMany(page = 1, pageSize = 4) {

        try {
            let skip = pageSize * (page - 1);
            let orders = await Order.find().limit(pageSize).skip(skip);
            return { result: orders, page: page, totalOrders: this.#totalOrders };
        } catch (e) {
            console.log("Error >> OrdersDao.getMany >>", e);
            throw e.message;
        }

    }

    async getOne(id) {
        try {
            return await Order.findById(id);

        } catch (e) {
            console.log("Error >> OrdersDao.getOne >>", e);
            throw e.message;
        }
    }

    async delete(id) {
        try {
            let result = await Order.findOneAndDelete({ _id: id });
            this.#totalOrders--;
            return result;
        } catch (e) {
            console.log("Error >> OrdersDao.delete >>", e);
            throw e.message;
        }

    }

}

module.exports = new OrdersDao();