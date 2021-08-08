// DOM Elements

const guessedLettersList = document.querySelector('.guessed-letters'),
      guessButton = document.querySelector('.guess'),
      // Text input for guess
      inputText = document.querySelector('.letter'),
      // Paragraph for in progress word
      wordInProgress = document.querySelector('.word-in-progress'),
      // Remaining Guesses Display
      remaining = document.querySelector('.remaining'),
      // Span for Remaining Guesses
      remainingSpan = document.querySelector('.remainingGuesses span'),
      // Message Paragraph
      messageParagraph = document.querySelector('.message'),
      // Play again button
      playAgainButton = document.querySelector('.play-again');

let remainingGuesses = 8;

// Placeholder Word
let word = "alligator";

const guessedLetters = [];

const getWord = async function() {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
  const data = await res.text();

  const wordArray = data.split("\n");
  console.log(wordArray);

  const randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();

  updateText(word);
}

// Replace Letters with Circles

const updateText = word => {
  const wordArray = [];

  for (let letter of word) {
    console.log(letter);
    wordArray.push("●");
  }

  wordInProgress.innerText = wordArray.join("");
}

// Validate Input

const validateInput = input => {
  const acceptedLetter = /[a-zA-Z]/;

  if(input.length === 0) {
     messageParagraph.innerText = "Enter a letter";
  } else if(input.length > 1) {
     messageParagraph.innerText = "Enter only 1 letter";
  } else if(!input.match(acceptedLetter)) {
     messageParagraph.innerText = "Enter a letter from A - Z";
  } else {
    return input;
  }
}

// Add Guessed Letter to Array

const makeGuess = letter => {
  // Convert letter to uppercase
  letter = letter.toUpperCase();

  // Check to see if guessedLetters contains letter
  if(guessedLetters.includes(letter)) {
    messageParagraph.innerText = "You've already guessed that letter. Try again."
  } else {
    guessedLetters.push(letter);
    countGuesses(letter);
    updateWord();
    replaceCircles(guessedLetters);
  }
}

//Show Guessed letters

const updateWord = () => {
  //Empty InnerHTML of ul
  guessedLettersList.innerHTML = "";
  // Create list item for each letter in guessedLetters array
  for (let letter of guessedLetters) {
    const li = document.createElement('li');
    li.innerText = letter;
    guessedLettersList.append(li);
  }
}

// Count Guesses

const countGuesses = guess => {
  const wordUpper = word.toUpperCase();
  if(wordUpper.includes(guess)) {
    messageParagraph.innerText = `${guess} is in the word.`;
  } else {
    messageParagraph.innerText = 'The word does not contain this letter. Try again.';
    remainingGuesses--;
  }

  if (remainingGuesses === 0) {
    remaining.innerText = 'GAME OVER';
  } else if(remainingGuesses === 1) {
    remaining.innerHTML = '<span>You have one guess remaining.</span>';
  } else {
    remaining.innerHTML = `<span>You have ${remainingGuesses} guesses remaining.</span>`;
  }
}



const replaceCircles = guessedLetters => {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const updatedWordArray = [];

  // Check if wordArray contains letters from guessedLetters

  for (let letter of wordArray) {
    if(guessedLetters.includes(letter)) {
      updatedWordArray.push(letter.toUpperCase());
    } else {
      updatedWordArray.push("●");
    }
  }
  wordInProgress.innerText = updatedWordArray.join("");
  checkIfWon();
}

// Check If User Has Won

const checkIfWon = () => {
  if(wordInProgress.innerText == word.toUpperCase()) {
    messageParagraph.classList.add('win');
    messageParagraph.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
  }
}

// Event Listener

guessButton.addEventListener("click", e => {
  e.preventDefault();

  // Empty Text of Message Element
  messageParagraph.innerText = "";

  // Value of input element
  let input = inputText.value;
  
  // Validate the input
  const validateCall = validateInput(input);

  if(validateCall) {
    makeGuess(input);
  }

  //Empty the input
  input = "";
  
})

getWord();