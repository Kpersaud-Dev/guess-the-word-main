// DOM Elements

const guessedLettersList = document.querySelector('.guessed-letters'),
      guessButton = document.querySelector('.guess'),
      // Text input for guess
      inputText = document.querySelector('.letter'),
      // Paragraph for in progress word
      wordInProgress = document.querySelector('.word-in-progress'),
      // Remaining Guesses Display
      remainingGuesses = document.querySelector('.remaining'),
      // Span for Remaining Guesses
      remainingGuessesSpan = document.querySelector('.remainingGuesses span'),
      // Message Paragraph
      messageParagraph = document.querySelector('.message'),
      // Play again button
      playAgainButton = document.querySelector('.play-again');

// Placeholder Word
const word = "magnolia";

// Replace Letters with Circles

const updateText = function(word) {
  const wordArray = [];

  for (let letter of word) {
    console.log(letter);
    wordArray.push("●");
  }

  wordInProgress.innerText = wordArray.join("");

}

guessButton.addEventListener("click", function(e) {
  e.preventDefault();

  let input = inputText.value;
  console.log(input);
  input = "";
})

updateText(word);
