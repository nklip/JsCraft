var SnakeGame = SnakeGame || {};

// The end-of-round panel: artwork, outcome message and the restart button.
//
// This replaces the native confirm() dialog. A native dialog moves keyboard
// focus out of the page, and the page never got it back after restarting, so
// the arrow keys stopped reaching the game until you clicked the board. An
// in-page panel keeps focus inside the document the whole time.
//
// It is a separate file so the planned win/lose artwork and round messages can
// grow here without touching the game loop.
SnakeGame.overlay = (function () {

    let root = null
    let artElement = null
    let titleElement = null
    let messageElement = null
    let buttonElement = null
    let restartHandler = null

    function build() {
        root = document.createElement('div')
        root.className = 'overlay'
        root.hidden = true

        const panel = document.createElement('div')
        panel.className = 'overlay-panel'

        // artwork slot - stays empty until show() is given an `art` url
        artElement = document.createElement('div')
        artElement.className = 'overlay-art'

        titleElement = document.createElement('h2')
        titleElement.className = 'overlay-title'

        messageElement = document.createElement('p')
        messageElement.className = 'overlay-message'

        buttonElement = document.createElement('button')
        buttonElement.className = 'overlay-button'
        buttonElement.type = 'button'
        buttonElement.addEventListener('click', () => {
            if (restartHandler) {
                restartHandler()
            }
        })

        panel.appendChild(artElement)
        panel.appendChild(titleElement)
        panel.appendChild(messageElement)
        panel.appendChild(buttonElement)
        root.appendChild(panel)
        document.body.appendChild(root)
    }

    // outcome is 'win' or 'lose' and drives the .overlay--win / .overlay--lose
    // class, so the two states can be styled and illustrated differently.
    // art is an optional image url shown above the title.
    function show({outcome, title, message, buttonLabel = 'Play again', art = null}) {
        if (root === null) {
            build()
        }

        root.classList.toggle('overlay--win', outcome === 'win')
        root.classList.toggle('overlay--lose', outcome === 'lose')

        artElement.innerHTML = ''
        if (art) {
            const image = document.createElement('img')
            image.src = art
            image.alt = ''
            artElement.appendChild(image)
        }

        titleElement.textContent = title
        messageElement.textContent = message
        buttonElement.textContent = buttonLabel

        root.hidden = false
        buttonElement.focus() // keeps focus inside the document
    }

    function hide() {
        if (root !== null) {
            root.hidden = true
        }
    }

    function onRestart(handler) {
        restartHandler = handler
    }

    return { show, hide, onRestart }
})()
