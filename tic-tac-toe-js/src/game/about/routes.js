let express = require('express')
let about = require('./about')

let router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
	res.render('about', about().response)
})

module.exports = router
