const guessHistory = [];
let guessesLeft = 10;
let targetNumber = 10;
let submit = document.querySelector('form');
let guesses = document.querySelector('.guesses');

function resetTagetNum(){
    targetNumber = Math.round(Math.random() * 100 + 1)
    return targetNumber;
} 

function validateGuess(userInput){
    if (targetNumber == userInput){
        guessHistory.push(userInput);
        guesses.innerHTML = guessHistory;
        document.querySelector('.lowOrHi').textContent = "You Won";
    }
    else{
        guessHistory.push(userInput);
        guesses.innerHTML = guessHistory;
        document.querySelector('.lowOrHi').textContent = "Better luck next time...";
    }
}

submit.addEventListener('submit', function(event){
    event.preventDefault();
    let userGuess = parseInt(document.getElementById('guessField').value);
    validateGuess(userGuess);
})