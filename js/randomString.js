function newInvoiceId() {
    let letters = String.fromCharCode(65 + Math.floor(Math.random() * 26))
    letters += String.fromCharCode(65 + Math.floor(Math.random() * 26))
    let numbers = Math.random().toString(9).substring(2, 6)
    //
    return letters + numbers;
}

