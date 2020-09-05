
var scores, activePlayer, gamePlaying, roundScore, dice1DOM, dice2DOM, rollBtn, newBtn, holdBtn;
var prevDice;

dice1DOM = document.querySelector('.dice1'),
dice2DOM = document.querySelector('.dice2'),
rollBtn = document.querySelector(".btn-roll"),
newBtn  = document.querySelector(".btn-new"),
holdBtn = document.querySelector(".btn-hold");

init();

rollBtn.addEventListener("click", function () {

	if (gamePlaying) {
		//Random No.
		var dice;
		var dice1 = getRandom();
		var dice2 = getRandom();		

		//Display result (Dice1)
		dice1DOM.style.display = 'block';
		dice1DOM.src = "dice-" + dice1 + ".png";

		//Display Dice2
		dice2DOM.style.display = 'block';
		dice2DOM.src = "dice-" + dice2 + ".png";

		dice = dice1 + dice2;
		console.log("Rolling " + dice);

		//if round score is'nt 1 logic..
		if (dice === 6 && prevDice === 6) {
			//player loses score
			scores[activePlayer] = 0;
			document.querySelector("#score-" + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice1 !== 1 && dice2 !== 1) {
			//Add Score
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}
		prevDice = dice;
		console.log(prevDice);
	}	
});

holdBtn.addEventListener("click", function () {	

	if (gamePlaying) {
		//Add current score to global score
		scores[activePlayer] += roundScore;

		// Update UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector(".scoreInput").value;
		var winningScore;

		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner !";
			diceDOM.style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	        gamePlaying = false;
		} else {
			//next player
			nextPlayer();		
		}
	}
});


newBtn.addEventListener("click", init);


//////////////////////////////////////////////////////////////////////////////////////////

function getRandom () {
	return Math.floor(Math.random() * 6) + 1;
}

function init () {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	dice1DOM.style.display = 'none';
	dice2DOM.style.display = 'none';

	document.getElementById("score-0").textContent = '0';
	document.getElementById("score-1").textContent = '0';
	document.getElementById("current-0").textContent = '0';
	document.getElementById("current-1").textContent = '0';
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice1').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
}
