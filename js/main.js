/*----- constants -----*/
const players = [
  {'1': 'player'},
  {'-1': 'dealer'}
];
const cardSuits = ['s', 'c', 'd', 'h'];
const cardRank = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildDeck();
const betAmounts = {
  ten: 10,
  twenty: 25,
  hundred: 100,
};
/*----- app's state (variables) -----*/
let gameStatus;
let playerHand = {};
let dealerHand = [];
let aceCount;
let shuffledDeck;
let totalWager = 0;
let bankTotal = 1000;
let playerScore = 0;
let dealerScore = 0;
/*----- cached element references -----*/
let dealButtonEl = document.getElementById('deal-button');
let hitStayEl = document.getElementById('hit-stay');
let hitButtonEl = document.getElementById('hit-button');
let stayButtonEl = document.getElementById('stay-button');
let chipEl = document.getElementById('coin-container'); 
let wagerEl = document.getElementById('wager-total');
let totalWagerEl = document.getElementById('total-wager');
let bankEl = document.getElementById('bank');
let playerHandEl = document.getElementById('player');
let dealerHandEl = document.getElementById('dealer');
let playerTotalEl = document.getElementById('total-player');
let dealerTotalEl = document.getElementById('total-dealer');
let deckEl = document.getElementById('deck');
/*----- event listeners -----*/
chipEl.addEventListener('click', getWager);
dealButtonEl.addEventListener('click', dealCards);
hitButtonEl.addEventListener('click', playerHit);
stayButtonEl.addEventListener('click', playerStay);
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
  if (totalWager > 0) dealButtonEl.style.visibility = 'visible';
  totalWagerEl.innerHTML = `${totalWager}`;
  return totalWager;
};

function dealCards(evt) {
  if (evt.target.id === 'deal-button') {
    bankEl.innerHTML = bankTotal - totalWager;
    hitStayEl.style.visibility = 'visible';
    chipEl.style.pointerEvents = 'none';
  };
  playerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
  dealerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
};


function playerHit(evt) {
  playerScore = 0;
  if (evt.target.id === 'hit-btn') {
    playerHand.push(shuffledDeck.shift());
  };
};

function playerStay(evt) {

};

function render() {
};