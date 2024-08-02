const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const results = document.getElementById("results");
const humanScoreElement = document.getElementById("human-score");
const computerScoreElement = document.getElementById("computer-score");
const choices = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;

// Function to get a random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to play a single round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return `You Win! ${humanChoice} beats ${computerChoice}`;
  } else {
    return `You Lose! ${computerChoice} beats ${humanChoice}`;
  }
}

// Function to play the entire game (5 rounds)
function playGame(humanChoice) {
  if (humanChoice === undefined) {
    return; // Exit the function if humanChoice is undefined
  }
  const computerSelection = getComputerChoice();

  const roundResult = playRound(humanChoice, computerSelection);
  results.textContent = roundResult;

  // Update scores based on round result
  if (roundResult.includes("Win")) {
    humanScore++;
    humanScoreElement.textContent = humanScore;
  } else if (roundResult.includes("Lose")) {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }

  // Check if either player has reached 5 wins
  if (humanScore === 5 || computerScore === 5) {
    displayFinalResults();
    let message;
    if (humanScore > computerScore) {
      message = "You won! Play Again?";
    } else if (humanScore < computerScore) {
      message = "You lose. Play Again?";
    } else {
      message = "It's a tie! Play Again?";
    }

    const playAgain = confirm(message); // Prompt to play again with win/loss indication
    if (playAgain) {
      resetGame();
    } else {
      results.textContent = "Thanks for playing!"; // Message if player doesn't want to play again
    }
  }
}

function displayFinalResults() {
  let message;
  if (humanScore > computerScore) {
    message = "You win the game!";
  } else if (humanScore < computerScore) {
    message = "You lose the game!";
  } else {
    message = "It's a tie!";
  }

  results.textContent = `${message} Final Scores: Human - ${humanScore}, Computer - ${computerScore}`;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
  results.textContent = "Choose rock, paper, or scissors:"; // Reset results display
}

// Add event listeners to buttons
rock.addEventListener("click", function() {
  playGame(choices[0]); // Pass "rock" as the choice
});

paper.addEventListener("click", function() {
  playGame(choices[1]); // Pass "paper" as the choice
});

scissors.addEventListener("click", function() {
  playGame(choices[2]); // Pass "scissors" as the choice
});

// Call the playGame function to start the game (assuming initial empty display)
playGame(); // This call can be removed if you want the game to start on button click