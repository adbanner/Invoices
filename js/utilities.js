//Get Month format
function getDateFormat(dateId) {
    // Date format
    let dateAr = dateId.split("-");
    let dateFormat =
        dateAr[2] + " " + monthAr[Number(dateAr[1] - 1)] + " " + dateAr[0];
    return dateFormat;
}

function getJsonDate(dateId) {
    let dateAr = dateId.split(" ");
    let month = monthAr.indexOf(dateAr[1]) + 1;
    dateAr = dateAr[2] + "-" + month + "-" + dateAr[0];

    return dateAr;
}

function getDateDue(date, days) {
    var date = new Date(date);
    // Add ten days to specified date
    date.setDate(date.getDate() + Number(days));

    date = date.toDateString().split(" ");
    let month = monthAr.indexOf(date[1]) + 1;
    date = date[3] + "-" + month + "-" + date[2]
    return date;
}

// Get Price format
function getPriceFormat(price) {
    return Number(price).toFixed(2);
}

// Count total price ------------------------------------------------
function countTotal(e) {
    const _value = e.target.parentNode.parentNode.parentNode.value;

    let total =
        $("item_quantity" + _value).value * $("item_price" + _value).value;
    $("item_total" + _value).innerHTML = total.toFixed(2);
}

//Scroll
function scrollPage(yy) {
    window.scrollTo(0, 0);
}

function show(element){
    element.style.display = "block"
}
function show(element){
    element.style.display = "none"
}