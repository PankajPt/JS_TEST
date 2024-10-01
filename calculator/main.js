let isResultCalculated = false;

function clearDisplay(clearCmd){
    if (isResultCalculated || clearCmd === 'AC'){
        isResultCalculated = false;
        return document.getElementById('display').value = "";
    }
}

function clearHistory(){
    document.getElementById('historyText').innerText = "";
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
    isResultCalculated = false;
    return document.getElementById('display').value = newDisplay;
}

function getResult(){
    try{
        let getEquation = document.getElementById('display').value;
        appendHistory(getEquation)
        let result = eval(getEquation);
        appendHistory(result)
        document.getElementById('display').value = result;
    }catch (err) {
        appendHistory(err.message);
    } finally {
        isResultCalculated = true;
    }
}

function appendHistory(history){
    document.getElementById('historyText').innerText += `${history}\n`;
}
