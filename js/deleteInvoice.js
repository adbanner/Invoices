function deleteInvoice() {
    sendRequest("DELETE_Invoice")
    jsonObj.splice(window.invoiceId, 1);
    parseInvoices();

}

function totallyDelete() {
    backToInvoices();
    hideDeletionPopup();
    deleteInvoice();
}

function showDeletionPopup() {
    scrollPage();
    $("fader").style.animation = "fader 0.5s";
    $("delete_popup").style.animation = "show-popup 0.5s";
    $("delete_popup").style.display = "grid";
    $("fader").style.display = "block";
}

function hideDeletionPopup() {
    $("delete_popup").style.display = "none";
    $("fader").style.display = "none";
}