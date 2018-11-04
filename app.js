/* 
-> create a game when the button rollBtn is clicked
- a random number is created
- the random number is connected to the dice
- this then displays the image of the relating dice face
- this number is added the "current-score"
- the player can then hold at any point
- the current score then becomes the "player-score" on the hold click button

-> the game then switches to player two
- the function runs again

-> if the player hits one then the player score becomes 0 and "You Lose prints in player-current score" 
- the scores will reset.

*/


const rollDice = document.getElementById('roll');
const holdDice = document.getElementById('hold');
const reset = document.getElementById('reset');
const p1Current = document.getElementById('current-score-0')

const dice = [{
		face: 1,
		image: "img/dice1.png"
	},
	{
		face: 2,
		image: "img/dice2.png"
	},
	{
		face: 3,
		image: "img/dice3.png"
	},
	{
		face: 4,
		image: "img/dice4.png"
	},
	{
		face: 5,
		image: "img/dice5.png"
	},
	{
		face: 6,
		image: "img/dice6.png"
	}
]

let playerTurn = true;
let currentScore = [0, 0];
let mainScore = [0, 0];

// The event listener checks when the hold button is clicked then the player changes

holdDice.addEventListener('click', () => {
	// if the player turn is true
	if (playerTurn) {
		// player 1's mainScore adds the current score
		// player 1's mainScore is added into the html of the mainScore
		addtoHTML('score-0', mainScore[0])
		// player 1's currentScore is reset too 0
		currentScore[0] = 0
		addtoHTML('current-score-0', currentScore[0])

		// playerTurn is changed
		playerTurn = false;
	} else {
		// mainScore[1] += currentScore[1]
		addtoHTML('score-1', mainScore[1])
		currentScore[1] = 0
		addtoHTML('current-score-1', currentScore[1])
		playerTurn = true;
	}
})

rollDice.addEventListener('click', () => {
	// when rollDice is clicked a random number is generated
	let randomNumber = Math.floor(Math.random() * 6) + 1;
	// checkDiceValue generates a string from the random number
	let imgSrc = checkDiceValue(randomNumber);
	// this function determines if the mainScore is higher than 20 or the dice face 1
	
	
	if (playerTurn) {
		let outcome = checkScoreFace(randomNumber, 0);
		currentScore[0] += randomNumber;
		addtoHTML('current-score-0', currentScore[0])

		if (typeof (outcome) != "undefined") {
			addtoHTML('current-0', outcome)
		}

	} else {
		let outcome = checkScoreFace(randomNumber, 1);
		currentScore[1] += randomNumber;
		
		addtoHTML('current-score-1', currentScore[1])
		if (typeof (outcome) != "undefined") {
			addtoHTML('current-1', outcome)
		}
	}
	document.getElementById('dice').src = imgSrc;
})

reset.addEventListener('click', () => {
	init()
})



function checkDiceValue(randomNumber) {
	for (let side of dice) {
		if (side.face == randomNumber) {
			return side.image
		}
	}
}

function checkScoreFace(side, player) {
	mainScore[player] += side;

	if (mainScore[player] >= 20) {
		if(player === 0) {
			addtoHTML('current-0', 'Winner')
		} else {
			addtoHTML('current-1', 'Winner')
		}
	} else if (side == 1) {
		if(player === 0) {
			addtoHTML('current-0', 'Loser')
		} else {
			addtoHTML('current-1', 'Loser')
		}
	}
}

function init() {
	currentScore = [0,0];
	mainScore = [0, 0];
	playerTurn = true;
	addtoHTML('score-0', 0);
	addtoHTML('current-score-0', 0);
	addtoHTML('current-0',"Current Score");
	addtoHTML('score-1', 0);
	addtoHTML('current-score-1', 0);
	addtoHTML('current-1',"Current Score");
}



function addtoHTML(id, value) {
	document.getElementById(id).innerHTML = value;
}