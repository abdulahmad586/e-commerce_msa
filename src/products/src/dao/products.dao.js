const Product = require('../model/product.model');

class ProductsDao {

    #totalProducts = 0;

    constructor() {
        this.#init();
    }

    async #init() {
        try {
            this.#totalProducts = await Product.count();
        } catch (e) {
            console.log("Error >> ProductsDao.#init >>", e);
        }
    }

    async create(name, category, quantity, price) {
        try {
            const product = new Product({ name, category, quantity, price })
            await product.save();
            this.#totalProducts++;
            return product;
        } catch (err) {
            console.log("Error >> ProductsDao.create >>", err.message);
            throw err.message
        }
    }

    async getMany(page = 1, pageSize = 4) {

        try {
            let skip = pageSize * (page - 1);
            let products = await Product.find().limit(pageSize).skip(skip);
            return { result: products, page: page, totalProducts: this.#totalProducts };
        } catch (e) {
            console.log("Error >> ProductsDao.getMany >>", e.message);
            throw err.message
        }

    }

    async getOne(id) {
        try {
            return await Product.findById(id);

        } catch (e) {
            console.log("Error >> ProductsDao.getOne >>", e.message);
            throw err.message;
        }
    }

    async update(id, name, quantity, price) {
        try {
            let update = {};
            if (name) {
                update.name = name
            }
            if (quantity) {
                update.quantity = quantity;
            }
            if (price) {
                update.price = price;
            }

            let result = await Product.findOneAndUpdate({ _id: id }, { $set: update });
            return result;
        } catch (e) {
            console.log("Error >> ProductsDao.update >>", e);
            throw err.message;
        }
    }

    async delete(id) {
        try {
            let result = await Product.findOneAndDelete({ _id: id });
            this.#totalProducts--;
            return result;
        } catch (e) {
            console.log("Error >> ProductsDao.delete >>", e);
            throw err.message;
        }

    }

}

module.exports = new ProductsDao();