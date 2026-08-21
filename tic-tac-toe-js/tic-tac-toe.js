require('app-module-path').addPath(__dirname + '/src/')

let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')

let about = require('game/about')
let index = require('game/index')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'assets/views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'assets/public')))

app.use(index())
app.use(about())

app.listen(3002, function () {
  console.log('Tic-tac-toe game running on port 3002!')
})

module.exports = app