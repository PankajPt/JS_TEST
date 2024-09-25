function clearDisplay(){
    return document.getElementById('display').value = "";
}

function getNumber(number){
    return document.getElementById('display').value += number;
}

function getOperator(operator){
    return document.getElementById('display').value += operator;
}

