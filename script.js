// Get all memory cards
const cards = document.querySelectorAll('.memory-card');

// Game state variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = 8;

// Handle card flip
function flipCard() {
  // Don't allow flipping if board is locked or same card clicked
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card flipped
  secondCard = this;
  checkMatch();
}


function checkMatch() {
  // Compare cards
  if (firstCard.dataset.framework === secondCard.dataset.framework) {

    removeCards();
  } else {

    flipBack(); 
  }
}


function removeCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  

  matchedPairs++;
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      document.querySelector('.win-message').style.display = 'block';
    }, 500);
  }
  
  reset();
}


function flipBack() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 1500);
}


function reset() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}


function shuffle() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 16);
  });
}


shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));