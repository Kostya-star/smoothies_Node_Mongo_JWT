const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')

mongoose.set('strictQuery', false)

const mongoDB = 'mongodb+srv://Constantin:deefterAdi2022@smoothiecluster.lzkdtdg.mongodb.net/auth?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(3000))
.catch(err => console.log(err))

app.get('/', (req, res) => res.render('home'))

app.get('/smoothies', (req, res) => res.render('smoothies'))

app.use(authRoutes)