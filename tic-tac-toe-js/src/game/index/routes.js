let express = require('express')
var randomstring = require("randomstring");
let g = require('./game')

let router = express.Router()
let globalMap = new Map();

/* GET users listing. */
router.get('/', (req, res) => {
	let button = req.query.button;
	let gameId = req.query.gameId;
	let remove = req.query.delete;
	if (remove) {
		if (globalMap.has(gameId)) {
			globalMap.delete(gameId);
		}
	}
	if (button) {
		console.log("get button = " + button);

		if (globalMap.has(gameId)) {
			game = globalMap.get(gameId);
		} else {
			game = new g.Game();
			globalMap.set(gameId, game);
		}

		game.process(button);
	} else {
		gameId = randomstring.generate(15);
		game = new g.Game();
		console.log('get button is empty');
	}
	res.render('board', game.render(gameId));
})

/*
router.post('/', (req, res) => {
	let button = req.body.button
	let gameId = req.query.gameId;
	if (button) {
		console.log("post button = " + button);

		game.process(button);
	} else {
		console.log('post button is empty');
	}
	res.render('board', game.render(gameId));
})
*/
module.exports = router
