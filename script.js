const ball = document.getElementById('ball');
const keeper = document.getElementById('keeper');
const playerScoreElement = document.getElementById('playerScore');
const keeperScoreElement = document.getElementById('keeperScore');
const resultElement = document.getElementById('result');
const spaceElement = document.getElementById('btnSpace');
const btnA = document.getElementById('btnA');
const btnS = document.getElementById('btnS');
const btnD = document.getElementById('btnD');
const btnW = document.getElementById('btnW');
const btnSpace = document.getElementById('btnSpace');

let playerScore = 0;
let keeperScore = 0;
let isSpacePressed = false;

const directions = {
	A: { x: 'left', y: 'middle' },
	S: { x: 'middle', y: 'middle' },
	D: { x: 'right', y: 'middle' },
	W: { x: 'middle', y: 'top' },
};

const positions = {
	left: 10,
	middle: 55,
	right: 90,
	top: 25,
};

function resetPositions() {
	ball.style.left = '50%';
	ball.style.top = '100%';
	keeper.style.left = '50%';
	keeper.style.top = '50%';
	resultElement.textContent = '';
	isSpacePressed = true;
   spaceElement.textContent = 'Reset';
}

document.addEventListener('keydown', (event) => {
	const key = event.key.toUpperCase();
	if (event.key === ' ') {
      if (playerScore >= 5 || keeperScore >= 5) {
			playerScore = 0;
			keeperScore = 0;
         playerScoreElement.textContent = playerScore;
			keeperScoreElement.textContent = keeperScore;
		}
		resetPositions();
	} else if (isSpacePressed && ['A', 'S', 'D', 'W'].includes(key)) {
		handleKeyPress(key);
	}
});

btnA.addEventListener('click', () => (isSpacePressed ? handleKeyPress('A') : ''));
btnS.addEventListener('click', () => (isSpacePressed ? handleKeyPress('S') : ''));
btnD.addEventListener('click', () => (isSpacePressed ? handleKeyPress('D') : ''));
btnW.addEventListener('click', () => (isSpacePressed ? handleKeyPress('W') : ''));
btnSpace.addEventListener('click', resetPositions);

function handleKeyPress(key) {
	const playerChoice = directions[key];
	const keeperChoice = directions[Object.keys(directions)[Math.floor(Math.random() * 4)]];

	ball.style.left = `${positions[playerChoice.x]}%`;
	ball.style.top = `${positions[playerChoice.y]}%`;

	keeper.style.left = `${positions[keeperChoice.x]}%`;
	keeper.style.top = `${positions[keeperChoice.y]}%`;

	if (playerChoice.x === keeperChoice.x && playerChoice.y === keeperChoice.y) {
		keeperScore++;
		resultElement.textContent = `😿\nKeeper saved!😿`;
      resultElement.style = "opacity: 1;";
	} else {
		playerScore++;
		resultElement.textContent = `😸\nGoal!\n😸`;
      resultElement.style = 'opacity: 1;';
	}

	if (playerScore >= 5 || keeperScore >= 5) {
		resultElement.textContent = playerScore >= 5 ? `😹You win!😹` : `😾Keeper wins!😾`;
      spaceElement.textContent = 'Start?';
	}
   playerScoreElement.textContent = playerScore;
	keeperScoreElement.textContent = keeperScore;
	isSpacePressed = false;
}

// Show Instructions or hide them
function toggleInstructions() {
   const instructionsDiv = document.querySelector('.instructions');
   console.log(instructionsDiv);
   if (instructionsDiv.classList.contains('hidden')) {
      instructionsDiv.classList.remove('hidden');
   } else {
      instructionsDiv.classList.add('hidden');
   }
}

document.querySelector('.instructions').addEventListener('click', toggleInstructions);
