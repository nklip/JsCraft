'use strict'

const chai = require('chai')
const expect = chai.expect

const ai = require('../../../src/game/index/ai')
const tile = require('../../../src/game/index/tile')

const emTile = tile.Tile.EMPTY;
const plTile = tile.Tile.PLAYER;
const aiTile = tile.Tile.AI;

describe('AI tests', () => {

    it('always should be ok', () => {
        expect(true).to.be.equal(true);
    })

    it ('simple test', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        expect(aiTest._board.size).to.be.equal(9);
        expect(aiTest._board.get(1).id).to.be.equal(1);
        expect(aiTest._board.get(1).type).to.be.equal(emTile);
        expect(aiTest._board.get(9).id).to.be.equal(9);
        expect(aiTest._board.get(9).type).to.be.equal(emTile);
    })

    it ('move test', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(5, plTile);
        expect(aiTest._board.get(5).type).to.be.equal(plTile);
       
        aiTest.move(5, aiTile);
        expect(aiTest._board.get(5).type).to.be.equal(plTile);
    })

    it ('victory case 01', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(3, plTile);
        aiTest.move(5, aiTile);
        aiTest.move(7, plTile);
        aiTest.move(1, aiTile);
        aiTest.move(8, plTile);

        /**
         |---|---|---| 
		 | O |   | X | 
		 |---|---|---| 
		 |   | O |   |
		 |---|---|---| 
		 | X | X |   | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(9).type).to.be.equal(aiTile);
    })

    it ('victory case 02', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(3, plTile);
        aiTest.move(1, aiTile);
        aiTest.move(7, plTile);
        aiTest.move(9, aiTile);
        aiTest.move(8, plTile);

        /**
         |---|---|---| 
		 | O |   | X | 
		 |---|---|---| 
		 |   |   |   |
		 |---|---|---| 
		 | X | X | O | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(5).type).to.be.equal(aiTile);
    })

    it ('victory case 03', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(1, plTile);
        aiTest.move(5, aiTile);
        aiTest.move(6, plTile);
        aiTest.move(7, aiTile);
        aiTest.move(9, plTile);

        /**
         |---|---|---| 
		 | X |   |   | 
		 |---|---|---| 
		 |   | O | X |
		 |---|---|---| 
		 | O |   | X | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(3).type).to.be.equal(aiTile);
    })

    it ('defense case 01', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(1, plTile);
        aiTest.move(7, aiTile);
        aiTest.move(9, plTile);

        /**
         |---|---|---| 
		 | X |   |   | 
		 |---|---|---| 
		 |   |   |   |
		 |---|---|---| 
		 | O |   | X | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(5).type).to.be.equal(aiTile);
    })

    it ('defense case 02', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(1, plTile);
        aiTest.move(5, aiTile);
        aiTest.move(7, plTile);

        /**
         |---|---|---| 
		 | X |   |   | 
		 |---|---|---| 
		 |   | O |   |
		 |---|---|---| 
		 | X |   |   | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(4).type).to.be.equal(aiTile);
    })

    it ('defense case 03', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(1, plTile);
        aiTest.move(5, aiTile);
        aiTest.move(3, plTile);

        /**
         |---|---|---| 
		 | X |   | X | 
		 |---|---|---| 
		 |   | O |   |
		 |---|---|---| 
		 |   |   |   | 
		 |---|---|---|
        **/
        aiTest.aiMove();

        expect(aiTest._board.get(2).type).to.be.equal(aiTile);
    })

    it ('random move. case 01', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.randomMove();
        let randomMove = false;
        for (let x = 1; x <= 9; x++) {
            let value = aiTest._board.get(x)._type;
            if (value == aiTile) {
                randomMove = true;
                break;
            }
        }
        expect(randomMove).to.be.true;
    })

    it ('random move. case 02', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest._move = true;
        aiTest.randomMove();

        let noMoves = true;
        for (let x = 1; x <= 9; x++) {
            let value = aiTest._board.get(x)._type;
            if (value != ' ') {
                noMoves = false;
                break;
            }
        }
        expect(noMoves).to.be.true;
    })

    it ('random move. case 03', () => {
        let aiTest = new ai.Ai();
        expect(aiTest).to.be.not.null;

        aiTest.move(1, plTile);
        aiTest.aiMove();

        let plMove = false;
        let aiMove = false;
        for (let x = 1; x <= 9; x++) {
            let value = aiTest._board.get(x)._type;
            if (value == aiTile) {
                aiMove = true;
            } else if (value == plTile) {
                plMove = true;
            }
        }
        expect(plMove).to.be.true;
        expect(aiMove).to.be.true;
    })
}) 