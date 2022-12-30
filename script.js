'use strict';


// Starting Conditions

let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')

let scores, currentScore, activePlayer, playing;

// Starting Conditions


const init = function () {
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init ();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')

}



diceEl.classList.add('hidden');
const diceButtonEl = document.querySelector('.btn--roll');

// currentScore0El.textContent = diceRoll --> will be a part of the function below later

diceButtonEl.addEventListener('click', function () {
    if (playing) {
        // Generate random number & add it to current score
        const diceRoll = Math.trunc((Math.random('') * 6) + 1)

        // 2. Display dice & appropriate number
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${diceRoll}.png`

        // 3. Roll dice picture
        if (diceRoll !== 1) {
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }

        else {
            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {

        // 1. Add current score to active player's score
        // if active player is Player 1 --> scores[1] = scores[1] + currentScore
        scores[activePlayer] += currentScore

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if player's score is >= 100
        // Finish the game
        if (scores[activePlayer] >= 100) {
            diceEl.classList.add('hidden')
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        else {
            switchPlayer();
        }
    }

})

btnNew.addEventListener('click', init);