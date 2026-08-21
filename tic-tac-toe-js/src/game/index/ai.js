'use strict'

const tile = require('./tile')

const emTile = tile.Tile.EMPTY;
const plTile = tile.Tile.PLAYER;
const aiTile = tile.Tile.AI;

class Ai {
    constructor() {
        let board = new Map();
        for (let id = 1; id <= 9; id++) {
			let tileEntity = new tile.Tile(id, emTile);
			board.set(id, tileEntity);
		}    
        this._board = board;
    }

    move(tileInt, cover) {
        let tileEntity = this._board.get(tileInt);
        if (tileEntity._type == emTile) {
            tileEntity._type = cover;
            this._board.set(tileInt, tileEntity);
        }
        return this;
    }

    aiMove() {
        this._move = false;
        this.victoryMove();
        if (this._move) {
            return;
        }
        this.defenseMove();
        if (this._move) {
            return;
        }
        this.randomMove();
    }

    victoryMove() {
        this.diagonalMove(aiTile);
        this.verticalMove(aiTile);
        this.horizontalMove(aiTile);
    }

    defenseMove() {
        this.diagonalMove(plTile);
        this.verticalMove(plTile);
        this.horizontalMove(plTile);
    }

    diagonalMove(cover) {
        this.line(cover, 1,5,9);
        this.line(cover, 3,5,7);
    }

    verticalMove(cover) {
        this.line(cover, 1,4,7);
        this.line(cover, 2,5,8);
        this.line(cover, 3,6,9);
    }

    horizontalMove(cover) {
        this.line(cover, 1,2,3);
        this.line(cover, 4,5,6);
        this.line(cover, 7,8,9);
    }

    line (cover, i1, i2, i3) {
        if (this._move) {
            return;
        }
        let count = 0;
        let empty = false;
        let t1 = this._board.get(i1)._type;
        let t2 = this._board.get(i2)._type;
        let t3 = this._board.get(i3)._type;

        if (t1 == cover) {
            count++; 
        } else if (t1 == emTile) {
            empty = true;
        }
        if (t2 == cover) {
            count++;
        } else if (t2 == emTile) {
            empty = true;
        }
        if (t3 == cover) {
            count++;
        } else if (t3 == emTile) {
            empty = true;
        }
        if (count == 2 && empty) {
            this._move = true; 
            this.move(i1, aiTile).move(i2, aiTile).move(i3, aiTile);
        } 
    }

    randomMove() {
        if (this._move) {
            return;
        }
        while (true) {
            let random = this.getRandomInt(1, 9);
            let tileEntity = this._board.get(random);
            if (tileEntity._type == emTile) {
                tileEntity._type = aiTile;
                this._board.set(random, tileEntity);
                break;
            }
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}


module.exports = {
	Ai: Ai
}