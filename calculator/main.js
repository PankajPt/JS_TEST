let isResultCalculated = false;

function clearDisplay(clearCmd){
    if (isResultCalculated || clearCmd === 'AC'){
        isResultCalculated = false;
        return document.getElementById('display').value = "";
    }
}

function getNumber(number){
    clearDisplay();
    return document.getElementById('display').value += number;
}

function getOperator(operator){
    isResultCalculated = false;
    return document.getElementById('display').value += operator;
}

function backSpace(){
    let str = document.getElementById('display').value;
    let len = str.length;
    let newDisplay = str.slice(0, len - 1 );
    return document.getElementById('display').value = newDisplay;
}

function getResult(){
    try{
        let dispValue = document.getElementById('display').value;
        document.getElementById('display').value = eval(dispValue);
        isResultCalculated = true;
    }catch (err) {
        document.getElementById('error-block').innerHTML = err.message;
    }
}