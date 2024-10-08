let height = document.getElementById('height');
let weight = document.getElementById('weight');
function calculateBMI(){
    if (height.value.length > 0 && weight.value.length > 0 && !isNaN(height.value) && !isNaN(weight.value)){
        let heightInCm = parseFloat(height.value);
        let weightInKg = parseFloat(weight.value);

        let resultBmi = (weightInKg / ((heightInCm/100)**2)).toFixed(1);
        if ( resultBmi < 18.6){
            let popText = `"Underweight" Your BMI index is: ${resultBmi}`;
            pop(popText);
        } else if (resultBmi >= 18.6 && resultBmi <= 24.9  ) {
            let popText = `"Normal Range" Your BMI index is: ${resultBmi}`;
            pop(popText);
        } else {
            let popText = `"Overweight" Your BMI index is: ${resultBmi}`;
            pop(popText);
        }
    } else {
        alert("Input Error: Please enter valid numeric values for both height and weight.");
    }
}
function pop(text){
    let getText = document.querySelector('.popup');
    getText.textContent = text;
}

let button = document.querySelector('.button');
button.addEventListener('submit', function (event) {
    event.preventDefault();
    calculateBMI();
});