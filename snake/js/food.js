var SnakeGame = SnakeGame || {};

// depends on: SnakeGame.snake, SnakeGame.grid
SnakeGame.food = (function () {

    let food = getRandomFoodPosition() // initial position, guaranteed not under the snake
    const EXPANSION_RATE = 1

    function update() {
        if (SnakeGame.snake.onSnake(food)) {
            SnakeGame.snake.expandSnake(EXPANSION_RATE)

            food = getRandomFoodPosition()
        }
    }

    function draw(gameBoard) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x

        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement);
    }

    function getRandomFoodPosition() {
        let newFoodPosition
        // to genereate a new food piece on a free piece
        while (newFoodPosition == null || SnakeGame.snake.onSnake(newFoodPosition)) {
            newFoodPosition = SnakeGame.grid.randomGridPosition()
        }
        return newFoodPosition;
    }

    // must be called AFTER SnakeGame.snake.reset(), so the new piece is placed
    // against the reset snake rather than the finished one
    function reset() {
        food = getRandomFoodPosition()
    }

    return { update, draw, reset }
})()
