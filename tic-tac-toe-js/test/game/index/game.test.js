'use strict'

const chai = require('chai')
const expect = chai.expect

const ai = require('../../../src/game/index/ai')
const tile = require('../../../src/game/index/tile')
const game = require('../../../src/game/index/game')

const emTile = tile.Tile.EMPTY;
const plTile = tile.Tile.PLAYER;
const aiTile = tile.Tile.AI;

describe('Game tests', () => {

    it('always should be ok', () => {
        expect(true).to.be.equal(true);
    })

    it('constructor', () => {
        let newGame = new game.Game();
        expect(newGame._winner).to.be.equal('');
        expect(newGame._state).to.be.equal('You should make a move!');

        let array = newGame.render("id");
        expect(array.pic1).to.be.equal('/img/default.png');
        expect(array.pic2).to.be.equal('/img/default.png');
        expect(array.pic3).to.be.equal('/img/default.png');
        expect(array.pic4).to.be.equal('/img/default.png');
        expect(array.pic5).to.be.equal('/img/default.png');
        expect(array.pic6).to.be.equal('/img/default.png');
        expect(array.pic7).to.be.equal('/img/default.png');
        expect(array.pic8).to.be.equal('/img/default.png');
        expect(array.pic9).to.be.equal('/img/default.png');
    })

    it('first move', () => {
        let newGame = new game.Game();
        newGame._print = false;
        newGame.process(5);
        expect(newGame._winner).to.be.equal('');
        expect(newGame._state).to.be.equal('You should make a move!');
    })

    it('Ai win. Case 01', () => {
        let newGame = new game.Game();
        newGame._print = false;
        newGame._ai.move(1, plTile);
        newGame._ai.move(5, aiTile);
        newGame._ai.move(9, plTile);
        newGame._ai.move(8, aiTile);

        /**
         |---|---|---| 
		 | X |   |   | 
		 |---|---|---| 
		 |   | O |   |
		 |---|---|---| 
		 |   | O | X | 
		 |---|---|---|
        **/
        newGame.process(1);

        expect(newGame._winner).to.be.equal('');
        expect(newGame._state).to.be.equal('This tile is already busy! Please choose another one.');
        expect(newGame._canPlay).to.be.equal(true);

        newGame.process(3);

        expect(newGame._winner).to.be.equal('Computer');
        expect(newGame._state).to.be.equal('Computer has won!');
        expect(newGame._canPlay).to.be.equal(false);
    })

    it('Player win. Case 01', () => {
        let newGame = new game.Game();
        newGame._print = false;
        newGame._ai.move(1, plTile);
        newGame._ai.move(5, aiTile);
        newGame._ai.move(9, plTile);
        newGame._ai.move(7, aiTile);
        newGame._ai.move(3, plTile);
        newGame._ai.move(2, aiTile);

        /**
         |---|---|---| 
		 | X | O | X | 
		 |---|---|---| 
		 |   | O |   |
		 |---|---|---| 
		 | O |   | X | 
		 |---|---|---|
        **/
        newGame.process(6);

        expect(newGame._winner).to.be.equal('Player');
        expect(newGame._state).to.be.equal('Player has won!');
        expect(newGame._canPlay).to.be.equal(false);
    })

    it('A draw. Case 01', () => {
        let newGame = new game.Game();
        newGame._print = false;
        newGame._ai.move(1, plTile);
        newGame._ai.move(5, aiTile);
        newGame._ai.move(9, plTile);
        newGame._ai.move(6, aiTile);
        newGame._ai.move(4, plTile);
        newGame._ai.move(7, aiTile);
        newGame._ai.move(3, plTile);
        newGame._ai.move(2, aiTile);

        /**
         |---|---|---| 
		 | X | O | X | 
		 |---|---|---| 
		 | X | O | O |
		 |---|---|---| 
		 | O | X | X | 
		 |---|---|---|
        **/
        newGame._print = true;
        newGame.process(8);

        expect(newGame._winner).to.be.equal('');
        expect(newGame._state).to.be.equal('It is a draw!');
        expect(newGame._canPlay).to.be.equal(true);

        newGame.process(8);
        expect(newGame._winner).to.be.equal('');
        expect(newGame._state).to.be.equal('It is a draw!');
        expect(newGame._canPlay).to.be.equal(false);

        let array = newGame.render("id");
        expect(array.pic1).to.be.equal('/img/cross.png');
        expect(array.pic2).to.be.equal('/img/zero.png');
        expect(array.pic3).to.be.equal('/img/cross.png');
        expect(array.pic4).to.be.equal('/img/cross.png');
        expect(array.pic5).to.be.equal('/img/zero.png');
        expect(array.pic6).to.be.equal('/img/zero.png');
        expect(array.pic7).to.be.equal('/img/zero.png');
        expect(array.pic8).to.be.equal('/img/cross.png');
        expect(array.pic9).to.be.equal('/img/cross.png');

    })

}) 