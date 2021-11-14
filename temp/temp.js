const Book = require('../models/book')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/saqib', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log('DB connection error!!!!!', err)
})

async function destroyBooks(){
    await Book.deleteMany({})
}

destroyBooks()