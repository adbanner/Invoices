// Check inputs
function checkInputs() {
    let error;
    let inputs = document.querySelectorAll("[data-input]")
    $("input_alert").innerHTML = "";

    inputs.forEach((input, n) => {
        if (!input.value.length) {
            error = true;
            addError(input)
        } else {
            removeError(input)
        }
    });
    // Fields error
    if(error) $("input_alert").innerHTML += "- All fields must be added</br>";


     //Email
     let emailInput = document.querySelector("[data-input='client-email']")
     const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (!emailInput.value.match(mailformat) ) {
        error = true;
        $("input_alert").innerHTML += "- Incorrect email format</br>";
        addError(emailInput)
     } else {
        removeError(emailInput)
     }






    //Items error
    if (!$("input_items").childNodes.length) {
        error = true
        $("input_alert").innerHTML += "- An item must be added</br>";
    }
    $("invoice_details").scrollTo(0, $("invoice_details").scrollHeight);
    return error;
}

function addError(element){
    element.classList.add("error-border");
}
function removeError(element){
    element.classList.remove("error-border");
}
