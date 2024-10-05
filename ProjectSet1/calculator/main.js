let isResultReady = false;
let isOperatorActive = false;

function clearDisplay(clearCmd){
    if (isResultReady || clearCmd === 'AC'){
        isResultReady = false;
        return document.getElementById('display').value = "";
    }
}

function clearHistory(){
    document.getElementById('historyText').innerText = "";
}
function getNumber(number){
    clearDisplay();
    isOperatorActive = false;
    return document.getElementById('display').value += number;
}

function getOperator(operator){
    isResultReady = false;
    let currentDisplay = document.getElementById('display').value;
    if (!isOperatorActive){
        document.getElementById('display').value += operator;
        isOperatorActive = true;
    } else {
        let newOperator = currentDisplay.slice(0, currentDisplay.length - 1);
        newOperator += operator;
        document.getElementById('display').value = newOperator;
        isOperatorActive = true;
    }
    
}

function backSpace(){
    let str = document.getElementById('display').value;
    let len = str.length;
    let newDisplay = str.slice(0, len - 1 );
    isResultReady = false;
    return document.getElementById('display').value = newDisplay;
}

function getResult(){
    try{
        let getEquation = document.getElementById('display').value;
        let result;
        if (!getEquation){
            result = "";
            document.getElementById('display').value = result;
        }
        else{
            result = eval(getEquation)
            document.getElementById('display').value = result;
            appendHistory(getEquation)
            appendHistory(result)
        }

    }catch (err) {
        appendHistory(err.message);
    } finally {
        isResultReady = true;
    }
}

function appendHistory(history){
    document.getElementById('historyText').innerText += `${history}\n`;
}
