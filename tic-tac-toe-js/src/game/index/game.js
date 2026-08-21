'use strict'

const tile = require('./tile')
const ai = require('./ai')

const emTile = tile.Tile.EMPTY;
const plTile = tile.Tile.PLAYER;
const aiTile = tile.Tile.AI;

class Game {
	constructor() {
        this._ai = new ai.Ai();
        this._canPlay = true;
        this._winner = '';
        this._state = 'You should make a move!';
        this._print = true;
	}

    process(button) {
        if (!this.isMovable()) {
            this._canPlay = false;
        }
        if (this._canPlay) {
            let tileId = Number.parseInt(button);
            if (!this.isFreeTile(tileId)) {
                this._state = "This tile is already busy! Please choose another one.";
                this.print(this._state);
                return;
            }
			this._ai.move(tileId, plTile);
			this.printBoard();
			if (this.isPlWinner()) {
                this.gameOver(); // player won
			} else if (this.isMovable()) {
				this._ai.aiMove();
			    this.printBoard();
                if (this.isAiWinner()) { // ai won
                    this.gameOver();
                }
			} else { // draw
                this._state = "It is a draw!";
                this.print(this._state);
            }
		}
    }

    print(message) {
        if (this._print) {
            console.log(message);
        }
    }

    gameOver() {
        this._canPlay = false;
        this._state = this._winner + ' has won!';
        this.print(this._state);
    }

    isFreeTile(tileId) {
        let t1 = this._ai._board.get(tileId)._type;
        if (t1 == emTile) {
            return true;
        }
        return false;
    }

    isMovable() {
        for (let i = 1; i <= 9; i++) {
            let movable = this.isFreeTile(i);
            if (movable) {
                return movable;
            }
        }
        return false;
    }

    isPlWinner() {
        let v = this.isVictory(plTile);
        if (v) {
            this._winner = 'Player';
        }
        return v;
    }

    isAiWinner() {
        let v = this.isVictory(aiTile)
        if (v) {
            this._winner = 'Computer';
        }
        return v;
    }

    // We can hardcode these values, because this game is simple.
    isVictory(cover) {
        if (this.isWinner(cover,1,2,3)) {
            return true;
        }
        if (this.isWinner(cover,4,5,6)) {
            return true;
        }
        if (this.isWinner(cover,7,8,9)) {
            return true;
        }
        if (this.isWinner(cover,1,4,7)) {
            return true;
        }
        if (this.isWinner(cover,2,5,8)) {
            return true;
        }
        if (this.isWinner(cover,3,6,9)) {
            return true;
        }
        if (this.isWinner(cover,1,5,9)) {
            return true;
        }
        if (this.isWinner(cover,3,5,7)) {
            return true;
        }
        return false;
    }

    isWinner(cover, tId1, tId2, tId3) {
        let t1 = this._ai._board.get(tId1)._type;
        let t2 = this._ai._board.get(tId2)._type;
        let t3 = this._ai._board.get(tId3)._type;
        if (t1 == cover && t2 == cover && t3 == cover) {
            return true;
        }
        return false;
    }

	printBoard() {
		// ugly af
		let t1 = this._ai._board.get(1)._type;
		let t2 = this._ai._board.get(2)._type;
		let t3 = this._ai._board.get(3)._type;
		let t4 = this._ai._board.get(4)._type;
		let t5 = this._ai._board.get(5)._type;
		let t6 = this._ai._board.get(6)._type;
		let t7 = this._ai._board.get(7)._type;
		let t8 = this._ai._board.get(8)._type;
		let t9 = this._ai._board.get(9)._type;

		let status =  
        `        
                 |---|---|---| 
		 | ${t1} | ${t2} | ${t3} | 
		 |---|---|---| 
		 | ${t4} | ${t5} | ${t6} |
		 |---|---|---| 
		 | ${t7} | ${t8} | ${t9} | 
		 |---|---|---|`;

         this.print(status);
	}

    render(currGame) {
        let t1 = this._ai._board.get(1)._type;
		let t2 = this._ai._board.get(2)._type;
		let t3 = this._ai._board.get(3)._type;
		let t4 = this._ai._board.get(4)._type;
		let t5 = this._ai._board.get(5)._type;
		let t6 = this._ai._board.get(6)._type;
		let t7 = this._ai._board.get(7)._type;
		let t8 = this._ai._board.get(8)._type;
		let t9 = this._ai._board.get(9)._type;

        return {
            pic1: this.picture(t1),
            pic2: this.picture(t2),
            pic3: this.picture(t3),
            pic4: this.picture(t4),
            pic5: this.picture(t5),
            pic6: this.picture(t6),
            pic7: this.picture(t7),
            pic8: this.picture(t8),
            pic9: this.picture(t9),
            state: this._state,
            gameId: currGame
        }
    }

    picture(value) {
        if (value == aiTile) {
            return '/img/zero.png';
        } else if (value == plTile) {
            return '/img/cross.png';
        } else {
            return '/img/default.png';
        }
    }
}

module.exports = {
	Game: Game
}