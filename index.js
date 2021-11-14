const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')
const indexRouter = require('./routes/index')


// connection
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/saqib'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log('DB connection error!!!!!', err)
})


// middlewares
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layouts/layout')
app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))



// routing
app.use('/', indexRouter)



// starting server
const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})