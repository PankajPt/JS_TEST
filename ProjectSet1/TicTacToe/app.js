const boxes = document.querySelectorAll('.cell');
const container = document.querySelector('.container');
let switchTurnO = true;
const hiddenScr = document.querySelector('.overlay-container')
const message = document.getElementById('message');
const newGamebtn = document.getElementById('newGame');
const resetbtn = document.getElementById('reset');
let clickCheck = 9
const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if (switchTurnO){
            box.innerHTML = "O"
            switchTurnO = false;
        } else {
            box.innerHTML = "X"
            switchTurnO = true;
        }
        --clickCheck;
        isWinner();
        box.style.backgroundColor = '#F08CAE';
        // box.setAttribute('disabled', '')
        box.disabled = true;
    })
})

function isWinner(){
    for (let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerHTML
        let pos2 = boxes[pattern[1]].innerHTML
        let pos3 = boxes[pattern[2]].innerHTML
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            // console.log(pos1, pos2, pos3)
            if(pos1 === pos2 && pos2 === pos3){
                let msg = `Player ${pos1} wins!!!`
                gameOver(msg)
            }
            if(!clickCheck){
                let msg = `No winner this time—it's a draw!`
                gameOver(msg)
            }
        }
    }
}

function gameOver(msg){
    hiddenScr.classList.add('show');
    message.innerHTML = msg;
    clickCheck = 9;
}

newGamebtn.addEventListener('click', resetGame)
resetbtn.addEventListener('click', resetGame)

function resetGame(){
    boxes.forEach((box)=>{
        switchTurnO = true;
        clickCheck = 9;
        box.innerHTML = "";
        box.style.backgroundColor = "#D4BCC6"
        box.disabled = false;
        hiddenScr.classList.remove('show');
    })
}