import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, snakeBodySize, SNAKE_SPEED} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
const SNAKE_WIN_SIZE = 30
const gameBoard = document.getElementById('game-board')

// we constantly execute this method
function main(currentTime) {
    if (checkDeath()) {
        reloadWindows('You lost. Press ok to restart')
        return
    }
    if (checkWin()) {
        reloadWindows('You won. Would you like to try again? If so press "Ok" to restart.')
        return
    }

    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return
    }

    lastRenderTime = currentTime

    update();
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
}

function draw() {
    gameBoard.innerHTML = '' // clear board to remove previos snake pieces

    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    return outsideGrid(getSnakeHead()) || snakeIntersection()
}

function checkWin() {
    return snakeBodySize() == SNAKE_WIN_SIZE;
}

function reloadWindows(message) {
    if (confirm(message)) {
        window.location.reload()
    }
}