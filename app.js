const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.set('strictQuery', false)

const mongoDB = 'mongodb+srv://Constantin:deefterAdi2022@smoothiecluster.lzkdtdg.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(3000))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.render('home'))

app.get('/smoothies', (req, res) => res.render('smoothies'))