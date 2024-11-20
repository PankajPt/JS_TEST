
function checkSubmitButton(titleInput, bodyTextarea, submitButton){
    if ( titleInput === '' || bodyTextarea === '' ){
        submitButton.disabled = true
    } else {
        submitButton.disabled = false
    }
}

function postNote(data, backend_uri){
    return fetch(`${backend_uri}/api/add`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((res)=>{
        if (!res.ok){
            throw new Error("Something is Fishy")
        }
        return res.json()
    })
    .catch((err)=> err.message)
}


export default { checkSubmitButton, postNote }