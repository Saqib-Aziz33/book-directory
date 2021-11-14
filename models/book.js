const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        filename: String,
        path: String
    },
    description: {
        type: String,
        required: true
    },
    publish: {
        type: String,
        required: true
    }
})

const Book = new mongoose.model('book', bookSchema)

module.exports = Book