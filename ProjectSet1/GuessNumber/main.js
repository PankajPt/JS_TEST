let guessLeft = 10;
let guessList = [];
let targetNumber = Math.floor(Math.random() * 15 + 1);
let userInput = document.getElementById('guessField');
let submit = document.getElementById('subt');
let range = 15;
let p = document.createElement('p');
let lowOrHi = document.querySelector('.lowOrHi');
let prevGuess = document.querySelector('.guesses');
let remainGuess = document.querySelector('.lastResult')
let startOver = document.querySelector('.resultParas');
let gameOn = true;

if (gameOn){
    submit.addEventListener('click', function(event){
        event.preventDefault();
        let _userInput_ = parseInt(userInput.value);
        checkInput(_userInput_);
    })
}

function checkInput(num){
    if (isNaN(num) || num > range || num <= 0 ){
        alert(`Please enter valid number between 1 - ${range}`);
    } else {
        checkAttempt(num);
    }
}

function checkAttempt(value){
    if (guessLeft === 0){
        let message = `Game Over. Lucky number was ${targetNumber}`;
        displayMessage(message);
        gameOver()
    } else {
        guessList.push(value);
        validateGuess(value);
        --guessLeft;
    }
}

function validateGuess(value){
    if(value === targetNumber){
        let message = `Victory! You guessed it right!<br> Lucky Number: ${targetNumber}`;
        clearScreen();
        displayMessage(message);
        gameOver();
    } else if (value < targetNumber){
        let hint = "Enter number is too less than lucky number..."
        clearScreen();
        displayMessage(hint);
    } else if ( value > targetNumber){
        let hint = "Enter number is too big than lucky number..."
        clearScreen();
        displayMessage(hint);
    }
}

function clearScreen(){
    userInput.value = '';
    prevGuess.textContent = guessList;
    remainGuess.textContent = guessLeft;
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function gameOver(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    submit.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="start">Start new game</h2>`;
    startOver.appendChild(p);
    gameOn = false;
    letsPlay();
}

function letsPlay(){
    const newBtn = document.getElementById('start');
    newBtn.addEventListener('click', function(){
        window.location.reload();
    })
}