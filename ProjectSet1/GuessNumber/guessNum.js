const guessHistory = [];
let guessesLeft = 10;
let targetNumber = Math.round(Math.random() * 100 + 1);
let submit = document.querySelector('form');
let guesses = document.querySelector('.guesses');
document.querySelector('.lastResult').textContent = guessesLeft;

function resetTagetNum(){
    targetNumber = Math.round(Math.random() * 100 + 1)
    return targetNumber;
} 

function counter(){
    guessesLeft--;
    document.querySelector('.lastResult').textContent = guessesLeft
    return guessesLeft;
}
function validateGuess(userInput){
    if (targetNumber == userInput){
        guessHistory.push(userInput);
        guesses.innerHTML = guessHistory;
        document.querySelector('.lowOrHi').textContent = "Victory! You guessed it right!";
    }
    else{
        guessHistory.push(userInput);
        guesses.innerHTML = guessHistory;
        document.querySelector('.lowOrHi').textContent = "Almost there! Give it another shot!";
    }
}
submit.addEventListener('submit', function(event){
    event.preventDefault();
    let userGuess = parseInt(document.getElementById('guessField').value);
    validateGuess(userGuess);
    counter();
    if (guessesLeft <= 0){
        document.getElementById('subt').disabled = true;
        document.querySelector('.lowOrHi').textContent = "All attempts exhausted. Try again!";
        console.log("after reset" + targetNumber)
    }
});
console.log(targetNumber)