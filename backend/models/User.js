const mongoose = require('mongoose');
const { Schema } = mongoose;

// Created User schema with name, email, password and date

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    }

});

// Modelling up User schema in mongo database.
const User = mongoose.model('user', UserSchema);

// Exporting user schema
module.exports = User;
