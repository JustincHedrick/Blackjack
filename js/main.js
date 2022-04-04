/*----- constants -----*/
const players = [
  {'1': 'player', wager:0, score: 0},
  {'-1': 'dealer', score: 0}
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
let playerHand = [];
let dealerHand = [];
let aceCount;
let shuffledDeck;
/*----- cached element references -----*/
let dealButtonEl = document.getElementById('deal-button');
let hitButtonEl = document.getElementById('hit-button');
let stayButtonEl = document.getElementById('stay-button');
let chipEl = document.getElementById('coin-container'); 
let wagerEl = document.getElementById('wager-total');
let bankEl = document.getElementById('bank-total > p');
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
      })
    })
  }) 
}

function newShuffle() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  };
};

function getWager(evt) {
  console.log(evt.target);
};

function dealCards(evt) {
  console.log(evt.target);
}

function playerHit(evt) {
  console.log(evt.target);
}

function playerStay(evt) {
  console.log(evt.target);
}

function compareValue() {

};

function render() {

}