function hexConverter(){
    let userInput = document.getElementById('text-input').value;
    if ( userInput.length > 0){
        let hexDump = '';
        for ( i = 0; i < userInput.length; i++){
            hexDump += userInput.charCodeAt(i).toString(16);
        }
        document.getElementById('hex-value').value = hexDump;
    }
}
let convertBtn = document.getElementById('convert-btn')
convertBtn.addEventListener('click', hexConverter);

