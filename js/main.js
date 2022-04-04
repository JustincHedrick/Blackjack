/*----- constants -----*/
const players = [
  {'1': 'player', wager:0, score: 0},
  {'-1': 'dealer', score: 0}
]
const cardSuits = ['s', 'c', 'd', 'h'];
const cardrank = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const betAmounts = {
  blue: 10,
  green: 25,
  black: 100,
}
/*----- app's state (variables) -----*/
let gameStatus;
let playerHand = [];
let dealerHand = [];
let deck = [];
let aceCount;
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
  render();
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

function render() {

}