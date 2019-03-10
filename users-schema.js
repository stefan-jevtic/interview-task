const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    city: String,
    country: String
});

module.exports = UsersSchema;