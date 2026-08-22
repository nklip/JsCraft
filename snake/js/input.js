var SnakeGame = SnakeGame || {};

SnakeGame.input = (function () {

    let inputDirection = { x: 0, y: 0}
    let lastInputDirection = { x: 0, y: 0 }

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault() // otherwise the arrows also scroll the page
                if (lastInputDirection.y !== 0) {
                    break
                }
                inputDirection = {x: 0, y: -1}
                break;
            case 'ArrowDown':
                e.preventDefault()
                if (lastInputDirection.y !== 0) {
                    break
                }
                inputDirection = {x: 0, y: 1}
                break;
            case 'ArrowLeft':
                e.preventDefault()
                if (lastInputDirection.x !== 0) {
                    break
                }
                inputDirection = {x: -1, y: 0}
                break;
            case 'ArrowRight':
                e.preventDefault()
                if (lastInputDirection.x !== 0) {
                    break
                }
                inputDirection = {x: 1, y: 0}
                break;
        }
    });


    function getInputDirection() {
        lastInputDirection = inputDirection;
        return inputDirection
    }

    // back to standing still, so a restarted round does not inherit a direction
    function reset() {
        inputDirection = { x: 0, y: 0 }
        lastInputDirection = { x: 0, y: 0 }
    }

    return { getInputDirection, reset }
})()
