'use strict'

const chai = require('chai')
const expect = chai.expect

const tile = require('../../../src/game/index/tile')

describe('Tile tests', () => {

    it('always should be ok', () => {
       expect(true).to.be.equal(true);
    })

    it ('simple test', () => {
       let testTile = new tile.Tile(1, ' ');
       expect(testTile).to.be.not.null;
       expect(testTile.id).to.be.equal(1);
       expect(testTile.type).to.be.equal(' ');

       testTile.type = '#';
       expect(testTile.type).to.be.equal('#');
       
       testTile._type = 'X';
       expect(testTile.type).to.be.equal('X');
    })
}) 
