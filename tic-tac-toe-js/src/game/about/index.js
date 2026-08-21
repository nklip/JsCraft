let express = require('express')
let routes = require('./routes')

module.exports = () => {
	let app = express()
	app.set('view engine', 'pug')
	app.set('views', 'assets/views/about')
	app.use('/about', routes)

	return app
}
