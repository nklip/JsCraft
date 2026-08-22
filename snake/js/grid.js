var SnakeGame = SnakeGame || {};

SnakeGame.grid = (function () {

    const GRID_SIZE = 21 // depends on the CSS style in index.html

    function randomGridPosition() {
        return {
            x : Math.floor(Math.random() * GRID_SIZE) + 1,
            y : Math.floor(Math.random() * GRID_SIZE) + 1
        }
    }

    function outsideGrid(position) {
        return (
            position.x < 1 || position.x > GRID_SIZE ||
            position.y < 1 || position.y > GRID_SIZE
        )

    }

    // GRID_SIZE stays private - anything not returned here is unreachable
    return { randomGridPosition, outsideGrid }
})()
