'use strict'

class Tile {
	constructor(id, type) {
		this._id = id;
		this._type = type;
	}

	get id() {
		return this._id;
	}

	set type(type) {
		this._type = type;
	}

	get type() {
		return this._type;
	}

	static get PLAYER() {
		return 'X';
	}

	static get AI() {
		return 'O';
	}

	static get EMPTY() {
		return ' ';
	}

}

module.exports = {
	Tile: Tile
}