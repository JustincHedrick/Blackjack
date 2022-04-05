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
let playerHand;
let dealerHand;
let aceCount;
let shuffledDeck;
let totalWager = 0;
let bankTotal = 1000;
let playerScore;
let dealerScore;
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
  bankTotal -= totalWager;
  return totalWager, bankTotal;
};

function dealCards(evt) {
  if (evt.target.id === 'deal-button') {
    bankEl.innerHTML = bankTotal - totalWager;
    hitStayEl.style.visibility = 'visible';
    chipEl.style.pointerEvents = 'none';
    dealButtonEl.style.pointerEvents = 'none';
  };
  dealHand(shuffledDeck, playerHand);
};


function playerHit(evt) {

  if (evt.target.id === 'hit-btn') {
    addCard(shuffledDeck, playerHand)
    cardCalc(playerHand);
  };
}

function playerStay(evt) {

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

function dealHand(deck, hand) {
  const card1 = pickCard(shuffledDeck);
  const card2 = pickCard(shuffledDeck);

  hand.push([card1, card2])
  hand.score = cardCalc(hand);

  return hand;
};

function addCard(deck, hand) {
  const newCard = pickCard(deck);
  hand.cards.push(newCard);
  hand.score = cardCalc(hand);

  return hand;
};

function pickCard(deck) {
  const newCard = shuffledDeck.shift();
  return newCard;
};

function getWinner() {

}

function render() {
};