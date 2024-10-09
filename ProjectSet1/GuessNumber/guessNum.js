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
        document.querySelector('.lowOrHi').textContent = "You Won";
        resetTagetNum();
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
    counter();
    if (guessesLeft < 0){
        document.getElementById('subt').disabled = true;
        document.querySelector('.lowOrHi').textContent = "Maximum attempt reached..";
        resetTagetNum();
        console.log("after reset" + targetNumber)
    }
});
console.log(targetNumber)