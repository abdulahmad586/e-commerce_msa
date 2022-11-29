const User = require('../model/user.model');

class UsersDao {

    #totalUsers = 0;

    constructor() {
        setTimeout(() => {
            this.#init();
        }, 5000);
    }

    async #init() {
        try {
            this.#totalUsers = await User.count();
        } catch (e) {
            console.log("Error >> UsersDao.#init >>", e);
        }
    }

    async create(name, email, address, password, userType = 'Customer') {
        try {
            const user = new User({ name, email, address, password, userType });
            await user.save();
            this.#totalUsers++;
            user.password = "******";
            return { ok: true, message: "Registered successfully", user }
        } catch (err) {
            console.log("Error >> UsersDao.create >>", e);
            return null;
        }
    }

    async update(id, name, address, userType) {
        try {
            const update = await User.findOneAndUpdate({ _id: id }, { $set: { name, address, userType } });

            return { ...update, name, address, userType };
        } catch (err) {
            console.log("Error >> UsersDao.create >>", e);
            return null;
        }
    }

    async getMany(page = 1, pageSize = 4, type) {

        try {
            let skip = pageSize * (page - 1);
            let users = await User.find({ userType: type }).limit(pageSize).skip(skip);
            return { result: users, page: page, totalUsers: this.#totalUsers };
        } catch (e) {
            console.log("Error >> UsersDao.getMany >>", e);
        }

    }

    async getOne(id) {
        try {
            let user = await User.findById(id);
            return user;
        } catch (e) {
            console.log("Error >> UsersDao.getOne >>", e);
        }
    }

    async login(email, password) {
        try {
            let user = await User.findOne({ email: email }).select('+password');
            if (user) {

                if (user.password === password) {
                    user.password = "******";
                    return { ok: true, message: "logged in successfully", user }
                } else {
                    return { ok: false, message: "Password is incorrect" }
                }

            } else {
                return { ok: false, message: "User not found" }
            }

        } catch (e) {
            console.log("Error >> UsersDao.login >>", e);
        }
    }

    async delete(id) {
        try {
            let result = await User.findOneAndDelete({ _id: id });
            this.#totalUsers--;
            return result;
        } catch (e) {
            console.log("Error >> UsersDao.delete >>", e);
        }

    }

}

module.exports = new UsersDao();