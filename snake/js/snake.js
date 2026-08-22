var SnakeGame = SnakeGame || {};

// depends on: SnakeGame.input
SnakeGame.snake = (function () {

    const SNAKE_SPEED = 5 // 5 times per second ~ 0.5 sec

    const STARTING_POSITION = {x: 11, y: 11}

    const snakeBody = [
        {...STARTING_POSITION}
    ]

    let newSegments = 0

    function snakeBodySize() {
        return snakeBody.length
    }

    function update() {
        addSegments()
        const inputDirection = SnakeGame.input.getInputDirection()
        for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1] = { ...snakeBody[i] } // to prevent reference/pointer issue
        }

        // move snake
        snakeBody[0].x += inputDirection.x
        snakeBody[0].y += inputDirection.y
    }

    function draw(gameBoard) {
        snakeBody.forEach(segment => {
            const snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = segment.y
            snakeElement.style.gridColumnStart = segment.x

            snakeElement.classList.add('snake')
            gameBoard.appendChild(snakeElement);
        })
    }

    function expandSnake(amount) {
        newSegments += amount
    }

    function onSnake(position, {ignoredHead = false} = {}) {
        return snakeBody.some((segment, index) => {
            if (ignoredHead && index === 0) {
                return false;
            }
            return equalPositions(segment, position)
        })
    }

    function getSnakeHead() {
        return snakeBody[0]
    }

    function snakeIntersection() {
        return onSnake(snakeBody[0], {ignoredHead: true})
    }

    function equalPositions(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y
    }

    function addSegments() {
        for (let i = 0; i < newSegments; i++) {
            snakeBody.push({...snakeBody[snakeBody.length - 1]})
        }

        newSegments = 0
    }

    // back to a single segment in the middle of the grid
    function reset() {
        snakeBody.length = 0
        snakeBody.push({...STARTING_POSITION})
        newSegments = 0
    }

    // snakeBody, newSegments, equalPositions and addSegments stay private
    return {
        SNAKE_SPEED, snakeBodySize, update, draw,
        expandSnake, onSnake, getSnakeHead, snakeIntersection, reset
    }
})()
