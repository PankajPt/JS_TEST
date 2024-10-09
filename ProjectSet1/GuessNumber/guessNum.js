const guessHistory = [];
let guessesLeft = 10;
let targetNumber = Math.floor(Math.random() * 15 + 1);
let submit = document.querySelector('form');
let guesses = document.querySelector('.guesses');
document.querySelector('.lastResult').textContent = guessesLeft;
console.log(targetNumber)

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
    let userGuess = document.getElementById('guessField').value;
    if (isNaN(parseInt(userGuess))){
        guessHistory.push(userGuess);
        guesses.innerHTML = guessHistory;
        document.getElementById('guessField').value = ""
        alert("Enter valid number between 1 - 15");
    } else {
        validateGuess(parseInt(userGuess))
        document.getElementById('guessField').value = ""
    }
    counter();
    if (guessesLeft <= 0){
        document.getElementById('subt').disabled = true;
        document.querySelector('.lowOrHi').innerHTML += `<br><span>All attempts exhausted.</span>`;
    }
});

