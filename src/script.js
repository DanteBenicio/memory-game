const front = "card-front"
const back = "card-back"
const cardClass = 'card'
const icon = 'icon'

onload = startGame()

function startGame() {
    initializeCards(game.createCardsFromTechs())
}

function initializeCards() {
    const gameBoard = document.getElementById('gameBoard')

    gameBoard.innerHTML = ''

    game.cards.forEach( card => {
        const cardElement = document.createElement('div')

        cardElement.id = card.id
        cardElement.classList.add(cardClass)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)

        gameBoard.appendChild(cardElement)

    })
}

function createCardContent(card, cardElement) {
    createCardFace(front, card, cardElement)
    createCardFace(back, card, cardElement)
}

function createCardFace(face, card, element) {
    const cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if(face === front) {
        const iconElement = document.createElement('img')
        iconElement.classList.add(icon)
        iconElement.src = `./assets/icon/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    }
    else {
        cardElementFace.innerHTML = "&lt/&gt"
    }

    element.appendChild(cardElementFace)
}

function flipCard() {
    if(game.setCard(this.id)) {
        this.classList.add('flip')

        if(game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        const gameOverLayer = document.getElementById('gameOver')
                        gameOverLayer.style.display = 'flex'
                    }, 500)
                }
            }
            else {
                setTimeout(() => {
                    const firstCardView = document.getElementById(game.firstCard.id)
                    const secondCardView = document.getElementById(game.secondCard.id)
        
                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')

                    game.unflipCards()
                }, 1000)
            }
        }
    }
}

function restart() {
    setTimeout(() => {
        game.clearCards()
        
        startGame()
        
        const gameOverLayer = document.getElementById('gameOver')
        gameOverLayer.style.display = 'none'
    }, 500)
}