/*----- constants -----*/
const gameStatus = {
  roundWon: false,
  roundLost: false,
  roundTie: false,
}
const cardSuits = ['s', 'c', 'd', 'h'];
const cardRank = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildDeck();
const betAmounts = {
  ten: 10,
  twenty: 25,
  hundred: 100,
};
/*----- app's state (variables) -----*/
let playerHand = [];
let dealerHand = [];
let aceCount;
let shuffledDeck;
let totalWager = 0;
let bankTotal = 1000;
/*----- cached element references -----*/
let dealButtonEl = document.getElementById('deal-button');
let hitStayEl = document.getElementById('hit-stay');
let hitButtonEl = document.getElementById('hit-btn');
let stayButtonEl = document.getElementById('stay-button');
let chipEl = document.getElementById('coin-container'); 
let totalWagerEl = document.getElementById('total-wager');
let bankEl = document.getElementById('bank');
let playerHandEl = document.getElementById('player');
let dealerHandEl = document.getElementById('dealer');
let playerTotalEl = document.getElementById('total-player');
let dealerTotalEl = document.getElementById('total-dealer');
let deckEl = document.getElementById('deck');
let resetEl = document.getElementById('reset-btn')
let messageEl = document.getElementById('message');
/*----- event listeners -----*/
chipEl.addEventListener('click', getWager);
dealButtonEl.addEventListener('click', dealCards);
hitButtonEl.addEventListener('click', playerHit);
stayButtonEl.addEventListener('click', playerStay);
resetEl.addEventListener('click', init)
/*----- functions -----*/
init();

function init() {
  buildDeck();
  newShuffle();
  render();
};


function buildDeck() {
  const deck = [];
  cardSuits.forEach(function(suit){
    cardRank.forEach(function(rank){
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  }); 
  return deck;
}

function newShuffle() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  };
  return shuffledDeck;
};

function getWager(evt) {
  if (evt.target.id === 'ten') totalWager += betAmounts.ten;
  if (evt.target.id === 'twenty-five') totalWager += betAmounts.twenty;
  if (evt.target.id === 'hundred') totalWager += betAmounts.hundred;
  if (totalWager > 0) {
     dealButtonEl.style.visibility = 'visible';
     messageEl.innerText = 'Deal cards!'
  }
  totalWagerEl.innerHTML = `${totalWager}`;
  return totalWager, bankTotal;
};

function dealCards(evt) {
  if (evt.target.id === 'deal-button') {
    hitStayEl.style.visibility = 'visible';
    chipEl.style.pointerEvents = 'none';
    dealButtonEl.style.pointerEvents = 'none';
  };
  dealHand(shuffledDeck, playerHand, dealerHand);
  playerTotalEl.innerText = playerHand.score;
  dealerTotalEl.innerText = dealerHand[0].value;
  renderCard(playerHand, playerHandEl);
  renderCard(dealerHand, dealerHandEl);
  messageEl.innerHTML = `You have ${playerHand.score} and dealer shows ${dealerHand[0].value}. Hit or stay?`
  if (playerHand.score === 21) {
    gameStatus.roundWon = true;
    messageEl.innerText = `BLACKJACK! You hit ${playerHand.score}.`;
  }
  resetGame();
};


function playerHit(evt) {
  if (evt.target.id === 'hit-btn') {
    addCard(shuffledDeck, playerHand);
    cardCalc(playerHand);
    messageEl.innerHTML = `You have ${playerHand.score}, dealer shows ${dealerHand[0].value}. Hit or stay?`
  };
  renderCard(playerHand, playerHandEl);
  if (playerHand.score > 21) {
    messageEl.innerHTML = `BUSTED. You have ${playerHand.score}.`
    gameStatus.roundLost = true;
  } 
  if (playerHand.score === 21) {
    gameStatus.roundWon = true;
    messageEl.innerText = `BLACKJACK! You hit ${playerHand.score}.`;
  }
  resetGame();
};

function playerStay(evt) {
  hitButtonEl.style.pointerEvents = 'none';
  
  if (evt.target.id === 'stay-btn');
  while (dealerHand.score <= 17) {
    addCard(shuffledDeck, dealerHand);
    cardCalc(dealerHand);
    renderCard(dealerHand, dealerHandEl);
    // stayButtonEl.style.pointerEvents = 'none';
    // return dealerHand.score;
  }
  
  getWinner();
};



function cardCalc(hand) {
  let total = 0;
  aceCount = 0;

  hand.forEach((card) => {
    if (card.value === 10) total += 10;
    if (card.value < 10) total += card.value;
    if (card.value === 11) aceCount += 1;
  });

  for (let i = 0; i < aceCount; i++) total > 10 ? (total += 1) : (total += 11);

  return total;
};

function dealHand(deck, hand, hand1) {
  const card1 = pickCard(deck);
  const card2 = pickCard(deck);
  const card3 = pickCard(deck);
  const card4 = pickCard(deck);

  hand.push(card1, card2);
  hand1.push(card3, card4);
  hand.score = cardCalc(hand);
  hand1.score = cardCalc(hand1);
  
  return hand, hand1;
};

function addCard(deck, hand) {
  const newCard = pickCard(deck);
  hand.push(newCard);
  hand.score = cardCalc(hand);

  return hand;
};

function pickCard(deck) {
  const newCard = shuffledDeck.shift();

  return newCard;
};

function getWinner() {
  let playerTotal = playerHand.score;
  let dealerTotal = dealerHand.score;

 if (playerTotal < 21) {
    if (dealerTotal > playerTotal) {
        gameStatus.roundLost = true;
        messageEl.innerHTML = `DEALER WINS. Dealer has ${dealerTotal} and you have ${playerTotal}.`
      } else if (dealerTotal < playerTotal) {
        gameStatus.roundWon =true;
        messageEl.innerHTML = `PLAYER WINS. Player has ${playerTotal} and dealer has ${dealerTotal}.`
      };
 }; 
 if (playerTotal === dealerTotal) {
   gameStatus.roundTie = true;
   messageEl.innerHTML = `PUSH. Dealer and player have ${playerTotal}.`
 }; 
 if (dealerTotal > 21) {
   gameStatus.roundWon = true;
   messageEl.innerHTML = `DEALER BUST. Dealer has ${dealerTotal}.`;
 };
 
 resetGame();
};

function renderCard(deck, container) {
  container.innerHTML = '';
   let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  container.innerHTML = cardsHtml;
};

function resetGame () {
  let status = gameStatus;
  if (status.roundLost || status.roundWon || status.roundTie === true) {
    resetEl.style.visibility = 'visible';
    resetEl.innerHTML = `New hand`
    hitButtonEl.style.pointerEvents = 'none';
    stayButtonEl.style.pointerEvents = 'none';
    if (status.roundWon === true) {
      bankTotal += totalWager *2;
      bankEl.innerHTML = `${bankTotal}`;
    }
     if (status.roundTie === true) {
      bankTotal += totalWager;
      bankEl.innerHTML = `${bankTotal}`;
    } 
    };
     if (status.roundTie === true) {
      bankTotal += totalWager;
      bankEl.innerHTML = `${bankTotal}`;
    }; 
    if (status.roundLost === true) {
      bankTotal -= totalWager;
      bankEl.innerHTML = `${bankTotal}`
      if (bankTotal <= 0) {
        messageEl.innerHTML = `Don't worry, atleast we aren't in vegas! Try again.`
        bankTotal = 1000;
        bankEl.innerHTML = `${bankTotal}`
      }
        bankEl.innerHTML = `${bankTotal}`;
      };
    };

function render() {
  messageEl.innerText = 'Place your bet!'
  dealerHand = [];
  playerHand = [];
  totalWager = 0;
  totalWagerEl.innerHTML = 0;
  bankEl.innerHTML = bankTotal;
  chipEl.style.pointerEvents = 'auto';
  dealButtonEl.style.pointerEvents = 'auto';
  dealButtonEl.style.visibility = 'hidden';
  hitStayEl.style.visibility = 'hidden';
  hitButtonEl.style.pointerEvents = 'auto'
  stayButtonEl.style.pointerEvents = 'auto';
  renderCard(playerHand, playerHandEl);
  renderCard(dealerHand, dealerHandEl);
  gameStatus.roundLost = false;
  gameStatus.roundTie = false;
  gameStatus.roundWon = false;
  resetEl.style.visibility = 'hidden';
};