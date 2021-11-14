if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const multer = require('multer')
const {storage} = require('../cloudinary/index')
const upload = multer({storage})
const cloudinary = require('cloudinary')

router.get('/', async (req, res) => {
    try{
        const books = await Book.find({})
        res.render('index', {books})
    }
    catch(err){
        console.log(err)
        res.send('cannot fetch books')
    }
})
//render new book form
router.get('/new', (req, res) => {
    res.render('new')
})
//submit new book form
router.post('/', upload.single('img'), async (req, res) => {
    try{
        const book = new Book(req.body)
        book.img = {
            filename: req.file.filename,
            path: req.file.path
        }
        await book.save()
        console.log('saved')
        res.redirect(`/${book._id}`)
    }
    catch(err){
        console.log('not saved', err)
        res.redirect('/new')
    }
})
//render single book
router.get('/:id', async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        res.render('show', {book})
    }
    catch(err){
        res.send('page not found')
    }
})
// render edit form
router.get('/:id/edit', async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        res.render('edit', {book})
    }
    catch(err){
        console.log(err)
        res.send('cannot fetch edit data')
    }
})
// update
router.put('/:id', upload.single('img'), async (req, res) => {
    try{
        const {id} = req.params
        //if user changes image
        if(req.file){
            let book = await Book.findById(id)
            await cloudinary.uploader.destroy(book.img.filename)
            await Book.findByIdAndUpdate(id, {
                title: req.body.title,
                author: req.body.author,
                publish: req.body.publish,
                img: {
                    filename: req.file.filename,
                    path: req.file.path
                },
                description: req.body.description
            })
            return res.redirect(`/${id}`)
        }
        //if user did't change photo
        await Book.findByIdAndUpdate(id, req.body)
        res.redirect(`/${id}`)
    }
    catch(err){
        console.log(err)
        res.send('cannot update')
    }
})
// delete
router.delete('/:id', async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        await cloudinary.uploader.destroy(book.img.filename)
        await Book.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }
    catch(err){
        console.log(err)
        res.send('cannot delete')
    }
})

module.exports = router