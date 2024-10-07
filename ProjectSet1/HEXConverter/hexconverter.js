function hexConverter(){
    let userInput = document.getElementById('text-input').value;
    if ( userInput.length > 0){
        let hexDump = '';
        for ( i = 0; i < userInput.length; i++){
            hexDump += userInput.charCodeAt(i).toString(16);
        }
        document.getElementById('hex-value').value = hexDump;
    } else {
        alert("Input required: Please enter text or a number.");
    }
}
let convertBtn = document.getElementById('convert-btn')
convertBtn.addEventListener('click', hexConverter);

function copy(){
    const copyText = document.querySelector('#hex-value');
    if ( copyText.value.length > 0 ){
        copyText.select();
        document.execCommand('copy');
        const pop = document.getElementById('popup');
        pop.classList.add('show');
        setTimeout( () => {
            pop.classList.remove('show');
        }, 2000);
    } else {
        alert("Error: Hex code not found."); 
    }

}

let copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', copy);
