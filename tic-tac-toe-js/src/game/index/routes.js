'use strict'

let express = require('express')
var randomstring = require("randomstring");
let g = require('./game')

let router = express.Router()

// Games live in memory, so the map needs a ceiling. Entries were only ever
// removed by an explicit ?delete, which meant every abandoned game stayed for
// the life of the process. Least-recently-used games are evicted first; an
// evicted game simply starts a fresh board on the next move.
const MAX_GAMES = 1000
let globalMap = new Map();

// Map keeps insertion order, so re-inserting makes a game the most recent and
// keys().next() is always the least recent.
function rememberGame(gameId, game) {
	globalMap.delete(gameId);
	globalMap.set(gameId, game);
	while (globalMap.size > MAX_GAMES) {
		globalMap.delete(globalMap.keys().next().value);
	}
}

function recallGame(gameId) {
	if (!globalMap.has(gameId)) {
		return null;
	}
	let game = globalMap.get(gameId);
	rememberGame(gameId, game); // touching it counts as use
	return game;
}

/* GET users listing. */
router.get('/', (req, res) => {
	let button = req.query.button;
	let gameId = req.query.gameId;
	let remove = req.query.delete;
	let game;
	if (remove) {
		if (globalMap.has(gameId)) {
			globalMap.delete(gameId);
		}
	}
	if (button) {
		console.log("get button = " + button);

		game = recallGame(gameId);
		if (game === null) {
			game = new g.Game();
			rememberGame(gameId, game);
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
