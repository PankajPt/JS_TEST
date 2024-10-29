function getRandomColor(){
    let hValue = '0123456789ABCDEF';
    let color = '#'
    for (let i = 0; i < 6; i++){
        let randomHex = Math.floor(Math.random() * 16);
        color += hValue[randomHex];
    }
    return color;
}

let intervalID;

const startColorChange = function(){
    if(!intervalID){
        intervalID = setInterval(bgColor, 1000);
    }
}

function bgColor(){
    document.querySelector('body').style.backgroundColor = getRandomColor();
}

const stopColorChange = function(){
    clearInterval(intervalID);
    intervalID = null;
}

document.getElementById('start').addEventListener('click', startColorChange)
document.getElementById('stop').addEventListener('click', stopColorChange)