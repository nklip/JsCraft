var SnakeGame = SnakeGame || {};

// Entry point. Depends on: SnakeGame.grid, SnakeGame.snake, SnakeGame.food,
// SnakeGame.input, SnakeGame.overlay.
// This file starts the loop and exports nothing, so it is a bare IIFE rather
// than an assignment onto the namespace.
//
// The semicolon on the line above is load-bearing. Without it, this IIFE is
// parsed as a call on the value of the previous statement, which makes it the
// right operand of `||`. Since the files loaded before this one already set
// SnakeGame, `||` short-circuits and the whole game silently never runs -
// no error, no output, just a blank board.
(function () {

    const STARTING_SNAKE_SIZE = 1

    let lastRenderTime = 0
    let running = false

    // How much food finishes the round. Deliberately a variable rather than a
    // constant: the planned round counter (round 1 -> 2 food, round 2 -> 4, and
    // so on) only needs to set this before calling restart(), without the loop
    // below changing at all.
    let foodToWin = 29 // a body of 30, which is what the old SNAKE_WIN_SIZE meant

    const gameBoard = document.getElementById('game-board')

    function foodEaten() {
        return SnakeGame.snake.snakeBodySize() - STARTING_SNAKE_SIZE
    }

    // we constantly execute this method
    function main(currentTime) {
        if (!running) {
            return
        }
        if (checkDeath()) {
            endRound('lose')
            return
        }
        if (checkWin()) {
            endRound('win')
            return
        }

        window.requestAnimationFrame(main)

        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SnakeGame.snake.SNAKE_SPEED) {
            return
        }

        lastRenderTime = currentTime

        update();
        draw()
    }

    function update() {
        SnakeGame.snake.update()
        SnakeGame.food.update()
    }

    function draw() {
        gameBoard.innerHTML = '' // clear board to remove previos snake pieces

        SnakeGame.snake.draw(gameBoard)
        SnakeGame.food.draw(gameBoard)
    }

    function checkDeath() {
        return SnakeGame.grid.outsideGrid(SnakeGame.snake.getSnakeHead()) || SnakeGame.snake.snakeIntersection()
    }

    function checkWin() {
        return foodEaten() >= foodToWin
    }

    // The two places the planned artwork plugs in: pass an `art` url and the
    // overlay renders it above the title.
    function endRound(outcome) {
        running = false

        if (outcome === 'win') {
            SnakeGame.overlay.show({
                outcome: 'win',
                title: 'You won!',
                message: 'You caught all ' + foodToWin + ' of them.',
                buttonLabel: 'Play again'
                // art: './assets/happy.png'
            })
        } else {
            SnakeGame.overlay.show({
                outcome: 'lose',
                title: 'You lost',
                message: 'You caught ' + foodEaten() + ' of ' + foodToWin + '. You will get it next time!',
                buttonLabel: 'Try again'
                // art: './assets/hopeful.png'
            })
        }
    }

    // Restarts in place instead of reloading the page. Reloading threw away the
    // document, and the fresh one did not get keyboard focus back, so the arrows
    // did nothing until you clicked. Staying on the same document avoids that -
    // and it is what lets a round counter survive from one round to the next.
    function restart() {
        SnakeGame.overlay.hide()

        SnakeGame.input.reset()
        SnakeGame.snake.reset()
        SnakeGame.food.reset() // after snake.reset(), so food avoids the reset snake

        lastRenderTime = 0
        draw()
        gameBoard.focus()
        start()
    }

    function start() {
        if (running) {
            return // never let two loops run at once
        }
        running = true
        window.requestAnimationFrame(main)
    }

    SnakeGame.overlay.onRestart(restart)

    gameBoard.focus() // so the arrows work without clicking first
    start()

})()
