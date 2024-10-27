// Selecting HTML Elements :
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const startGameButton = document.getElementById("start-game");

const scoreboard = document.getElementById("scoreboard");
const player1Display = document.getElementById("player1-display");
const player2Display = document.getElementById("player2-display");

const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");

startGameButton.addEventListener("click", Name);

function Name() {
  player1 = player1Name.value;
  player2 = player2Name.value;
  if (!player1 || !player2) {
    alert("Both players must enter their names!");
    return;
  }

  player1Display.textContent = player1;
  player2Display.textContent = player2;

  document.getElementById("player-info").style.display = "none";
  scoreboard.style.display = "flex";
  categorySelection.style.display = "block";
  categories();
}

// Category Selection and API fetching : 
const categorySelection = document.getElementById("Category-info");
const categoryItem = document.getElementById("category-item");
const selectCategoryButton = document.getElementById("category-select");

async function categories() {
  const response = await fetch("https://the-trivia-api.com/v2/categories");
//   console.log(response)
  const categories = await response.json();
//   console.log(categories);

  categoryItem.innerHTML = "";

  for (const category in categories) {
    // console.log(category);

    const option = document.createElement("option");

    option.value = category;
    option.textContent = categories[category];
    // console.log(option);

    categoryItem.appendChild(option);
    // console.log(categoryItem);
  }
}

let question;
let IndexQuestion;
let QuestionIndexing;

// Question fetching : 
const questionPart = document.getElementById("question-part");
selectCategoryButton.addEventListener("click", Questions);

async function Questions() {
  IndexQuestion = categoryItem.value;
    // console.log(IndexQuestion)

  const response = await fetch("https://the-trivia-api.com/v2/questions");
//   console.log(response);

  question = await response.json();
//   console.log(question);
  categorySelection.style.display = "none";
  questionPart.style.display = "block";
  QuestionIndexing = 0;
  QuestionShow();
}

// Questionshow Function : 

const questionText = document.getElementById("questionKatext");
const optionsContainer = document.getElementById("optionskacontainer");
const PlayerName = document.getElementById("Player-Name");

function QuestionShow() {
  const currentQuestion = question[QuestionIndexing];
    // console.log(currentQuestion);     

  questionText.textContent = currentQuestion.question.text;
    // console.log(questionText);

  optionsContainer.innerHTML = "";
  const option = [...currentQuestion.incorrectAnswers,currentQuestion.correctAnswer,].sort(() => Math.random() - 0.5);

  option.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });
}

let playerTurn = 0;
let player1Score = 0;
let player2Score = 0;

const resultSection = document.getElementById("result-section");
const resultText = document.getElementById("result-text");
const playAgainButton = document.getElementById("play-again");


// Player turn and scoring logic : 
function checkAnswer(chooseOption) {
  const currentQuestion = question[QuestionIndexing];
  const correct = chooseOption === currentQuestion.correctAnswer;

  const marks = getMarks(currentQuestion.difficulty);
  if (correct) {
    if (playerTurn === 0) {
      player1Score += marks;
      player1ScoreDisplay.textContent = player1Score;
    } else {
      player2Score += marks;
      player2ScoreDisplay.textContent = player2Score;
    }

    alert(`Correct! ${marks} points awarded. player`); 
    
  } else {
    alert("Incorrect answer!");
  }

  // Game progress and End

  playerTurn = 1 - playerTurn;
  QuestionIndexing++;
  if (QuestionIndexing < question.length - 4) {
    QuestionShow();
  } else {
    endGame();
  }

  // Scoring bases on difficulty
  function getMarks(difficulty) {
    switch (difficulty) {
      case "easy":
        return 10;
      case "medium":
        return 15;
      case "hard":
        return 20;
      default:
        return 0;
    }
  }

  // EndGame function

  function endGame() {
    questionPart.style.display = "none";
    resultSection.style.display = "block";

    if (player1Score > player2Score) {
      resultText.textContent = `${player1} wins with ${player1Score} points!`;
    } else if (player2Score > player1Score) {
      resultText.textContent = `${player2} wins with ${player2Score} points!`;
    } else {
      resultText.textContent = `It's a tie! Both scored ${player1Score} points.`;
    }
  }

  // Play again or exit
  playAgainButton.addEventListener("click", () => location.reload());
  
  const exitButton = document.getElementById("Exit");
  const ExitGame = document.getElementById("Exit-Game");

  ExitGame.textContent = "THANKYOU VISIT AGAIN...!!";
  exitButton.addEventListener("click", () => {
    resultSection.style.display = "none";
    ExitGame.style.display = "block";
  });
}
