const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched')
    secondCard.classList.add('matched')
    resetBoard()
    checkGameOver()
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkGameOver() {
    for(let card of cards) {
        if (!card.classList.contains('matched')) return
    }
    lockBoard = true
    setTimeout(() => {
        cards.forEach(function(card, index) {
            setTimeout(function() {
                card.addEventListener('click', flipCard)
                card.classList.remove('matched')
                card.classList.remove('flip')
                
            }, 500 * index)
        })
    }, 2000)

    setTimeout(() => {
        shuffle()
    }, 8500)

}

function shuffle() {
    lockBoard = false
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition
    })
}

(function shuffle() {
    lockBoard = false
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

