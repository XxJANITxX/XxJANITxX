const mongoose = require('mongoose');
const { Schema } = mongoose;

// Created Notes schema with title, description, tag and date

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        default: "General"
    },

    date: {
        type: Date,
        default: Date.now
    }

});

// Modelling up and exporting Notes Schema

module.exports = mongoose.model('notes', NotesSchema);