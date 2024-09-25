function clearDisplay(){
    return document.getElementById('display').value = "";
}

function getNumber(number){
    return document.getElementById('display').value += number;
}

function getOperator(operator){
    return document.getElementById('display').value += operator;
}

function backSpace(){
    let str = document.getElementById('display').value;
    let len = str.length;
    let newDisplay = str.slice(0, len - 1 );
    return document.getElementById('display').value = newDisplay;
}

function getResult(){
    return document.getElementById('display').value = "Function cominng sooooon!!!"
}