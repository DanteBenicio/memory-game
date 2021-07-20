const game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard(id) {
        let card = this.cards.filter( card => card.id === id)[0];
        console.log(card)

        if(card.flipped || this.lockMode) {
            return false
        }

        if(!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true
            return true
        }
        else {
            this.secondCard = card;
            this.secondCard.flipped = true
            this.lockMode = true;
            return true
        }
    },

    checkMatch() {
        if (!this.firstCard || !this.secondCard) return false;

        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards() {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards() {
        this.firstCard.flipped = false,
        this.secondCard.flipped = false,
        this.clearCards()
    },

    checkGameOver() {
       return this.cards.filter( card => !card.flipped).length == 0
    },

    techs: ['vue',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    createCardsFromTechs() {
        this.cards = []
    
        this.techs.forEach( tech => {
            this.cards.push(this.createPairFromTech(tech))
        })
    
        this.cards = this.cards.flatMap( pair => pair)
        this.shuffleCards()
        return this.cards
    },
    
    createPairFromTech(tech)  {
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            }
        ]
    },

    createIdWithTech(tech) {
        return tech + Math.round(Math.random() * 1000)
    },

    shuffleCards() { 
        let currentIndex = this.cards.length;
        let randomIndex = 0
    
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    
        }
    }
}