const body = document.body;
const buttons = document.querySelectorAll('.button');

buttons.forEach( (button) => {
    button.addEventListener('click', (event) => {
        const color = event.target.id;
        body.style.backgroundColor = color;
    })
} )