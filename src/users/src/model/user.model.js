const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, index: true, required: true, },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: false },
    password: { type: String, required: true, select: false },
    userType: { type: String, enum: ['Admin', 'Customer'], default: 'Customer' },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
