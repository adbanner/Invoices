
const monthAr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const inputAr = [
    ["clientName", "invoice_clientName", "clientName_input"],
    ["clientEmail", "invoice_clientEmail", "clientEmail_input"],
    ["sender_street", "sender_street", "sender_street_input"],
    ["sender_city", "sender_city", "sender_city_input"],
    ["sender_country", "sender_country", "sender_country_input"],
    ["sender_postCode", "sender_postCode", "sender_postCode_input"],
    ["client_city", "client_city", "client_city_input"],
    ["client_street", "client_street", "client_street_input"],
    ["client_country", "client_country", "client_country_input"],
    ["client_postCode", "client_postCode", "client_postCode_input"],
    ["createdAt", "invoice_createdAt", "createdAt_input"],
    ["paymentDue", "invoice_paymentDue", ""],
    ["paymentTerms", "", "paymentTerms_input"],
    ["description", "invoice_description", "description_input"]
];


var screen_size = 0;
var invoicesTotal = 0;
var detailsPanelId = 0;
var editPanelId = 0;
var newPanelId = 0;

var invoiceId = 0;
var invoiceStatus;
var invoice_data = '{}';
var invoice_id;
var invoiceId_save;

var lastYPosition;
var itemId = 0;
var statusId;
var page_id = "invoices";
var r = document.querySelector(":root");
let avatarId = true

// Set avatar
function setAvatar() {
    //googleUser.user.picture ? avatar = googleUser.picture: false;
    if (!avatarId || !avatar) return // $("avatar").innerHTML = "";
    $("avatar").innerHTML = "<img src=" + avatar + ">";
    avatarId = false
}

// Loader icon
function showLoader(loader) {
    document.querySelector("[data-preloader]").style.display = 'block'
    document.querySelector("[data-preloader-line]").classList.remove("paused")
}
function hideLoader() {
    document.querySelectorAll("[data-preloader-line]").forEach((element) => {
        document.querySelector("[data-preloader]").style.display = 'none';
       
    })
    document.querySelector("[data-preloader]").classList.toggle("paused")
}


//Pars invoices ====================================================
function parseInvoices() {
    invoicesTotal = jsonObj.length;
    $("invoice-container").innerHTML = "";
    //Invoices total
    $("invoices_total").innerHTML = jsonObj.length;


    //////////////////////////////////////
    jsonObj.forEach((_invoice, n) => {

        var status;
        var status_text;

        switch (_invoice.status) {
            case "draft":
                status = "draft";
                status_text = "Draft";
                break;
            case "pending":
                status = "pending";
                status_text = "Pending";
                break;
            case "paid":
                status = "paid";
                status_text = "Paid";
                break;
        }
        //let invoiceJson = JSON.parse(JSON.stringify(jsonObj[n]))
        // Date format
        let dueDate;
        _invoice.paymentDue
            ? (dueDate = "Due  " + getDateFormat(_invoice.paymentDue))
            : (dueDate = "");


        // Add Invoice -------------------------
        $("invoice-container").innerHTML +=
            '<div id="invoice_' +
            n +
            '" value="' +
            n +
            '"  data-status=' +
            invoiceData(n, "status") +
            '> <div class="invoice bg1"> <div class="id-and-name"> <div class="id-and-date"> <div class="invoice_id fw-bold"> <span class="hash-tag">#</span> <span id="invoice_id">' +
            invoiceData(n, "id") +
            '</span> </div><div class="invoice-date">' +
            dueDate +
            '</div></div><div id="client_name" class="client-name">' +
            invoiceData(n, "clientName") +
            '</div></div><div class="total-and-status "> <div><span>£</span> <span id="invoice_total">' +
            invoiceData(n, "total") +
            '</span> </div><div class="status-item fw-bold ' +
            invoiceData(n, "status") +
            '"> <span style="font-size: 1.6rem; margin:-4px; padding: 0; ">&#8226;</span><span>' +
            invoiceData(n, "status_name") +
            "</span></div></div></div></div>";
        //end
    });

    jsonObj.forEach((_invoice, n) => {
        $("invoice_" + n).value = n;
        $("invoice_" + n).addEventListener("click", onInvoiceClick);
    });

    // Applay filter
    if (window.filterId) {
        filterInvoices(window.filterId);
    }

}
// Set invoice data
function setInvoiceData() {

    let id = window.invoiceId;
    let invoiceObj = jsonObj[id];
    inputAr.forEach((element) => {
        if (element[1]) {
            $(element[1]).innerHTML = invoiceData(id, element[0]);
        }
        if (element[2]) {
            $(element[2]).value = invoiceData(id, element[0]);
        }
    });

    $("invoice_card_id").innerHTML = invoiceData(id, "id");
    $("edit_invoice_card_id").innerHTML = invoiceData(id, "id");
    $("delete_id").innerHTML = invoiceData(id, "id");

    // Parse Items
    $("card_items").innerHTML = "";
    $("input_items").innerHTML = "";

    //
    invoiceObj.items.length ? $("card_items").style.display = "grid" : $("card_items").style.display = "none";

    var invoice_total = 0;
    itemId = 0;
    for (var i = 0; i < invoiceObj.items.length; i++) {
        const item_total = getPriceFormat(
            Number(invoiceObj.items[i].quantity) *
            Number(getPriceFormat(invoiceObj.items[i].price))
        );
        invoice_total += Number(item_total);

        // Add item to card
        $("card_items").innerHTML +=
            '<div class="flex"> <div class=" grid gap-0"> <p>' +
            invoiceObj.items[i].name +
            '</p><span class="ff-clr-400">' +
            invoiceObj.items[i].quantity +
            " x £ " +
            getPriceFormat(invoiceObj.items[i].price) +
            "</span> </div><p>£ " +
            item_total +
            "</p></div>";

        // Add item to edit section

        addNewItem(i);
        $("item_description" + i).value = invoiceObj.items[i].name;
        $("item_quantity" + i).value = invoiceObj.items[i].quantity;
        $("item_price" + i).value = invoiceObj.items[i].price;

        $("item_total" + i).innerHTML = item_total;

        //Invoice total
    }
    $("invoice_card_total").innerHTML = getPriceFormat(invoice_total);
}

//==================================================================

// Invoice event
function onInvoiceClick(e) {
    window.invoiceId = e.target.parentNode.value;


    removeErrorMsg();
    setInvoiceData(window.invoiceId);
    window.page_id = "invoice_card";
    scrollPage();
    $("invoice_card").style.animation = "slide-top 0.3s";
    $("invoices").style.display = "none";
    $("invoice_card").style.display = "grid";

    removeStatusClass();
    invoice_id = jsonObj[invoiceId].id
    invoiceStatus = jsonObj[invoiceId].status;
    $("card_status").classList.add(jsonObj[invoiceId].status);
    $("card_status_name").innerHTML = invoiceData(
        window.invoiceId,
        "status_name"
    );

    if (jsonObj[invoiceId].status == "paid") {
        $("edit_invoice_btn").style.display = "none";
        $("edit_invoice_btn_mobile").style.display = "none";

        $("mark_invoice_btn").style.display = "none";
        $("mark_invoice_btn_mobile").style.display = "none";
    } else if (jsonObj[invoiceId].status == "draft") {
        $("edit_invoice_btn").style.display = "block";
        $("edit_invoice_btn_mobile").style.display = "block";

        $("mark_invoice_btn").style.display = "none";
        $("mark_invoice_btn_mobile").style.display = "none";
    } else if (jsonObj[invoiceId].status == "pending") {
        $("edit_invoice_btn").style.display = "block";
        $("edit_invoice_btn_mobile").style.display = "block";

        $("mark_invoice_btn").style.display = "block";
        $("mark_invoice_btn_mobile").style.display = "block";
    }
    onResize();
}

// Remove status class -----------------------------------------
function removeStatusClass() {
    $("card_status").classList.remove("paid");
    $("card_status").classList.remove("pending");
    $("card_status").classList.remove("draft");
}


//Mark as Paid -----------------------------------------
function markAsPaid() {
    sendRequest("UPDATE_Status");

    jsonObj[invoiceId].status = "paid"
    $("card_status").classList.add("paid");
    $("card_status_name").innerHTML = "Paid";
    $("mark_invoice_btn").style.display = "none";
    $("mark_invoice_btn_mobile").style.display = "none";

    $("edit_invoice_btn").style.display = "none";
    $("edit_invoice_btn_mobile").style.display = "none";

    parseInvoices();

    $('card_status').style.animation = "blink 0.2s forwards 2"
}

function markAsPending() {
    $("card_status").classList.add("pending");
    $("card_status_name").innerHTML = "Pending";

    $("mark_invoice_btn").style.display = "block";
    $("mark_invoice_btn_mobile").style.display = "block";

    parseInvoices();
}


/// Save options   ------------------------------------------

function saveAsDraft() {
    window.invoiceId_save = newInvoiceId();
    window.statusId = "draft";
    saveInvoice("new");
}
function saveAndSend() {
    if (checkInputs()) return;
    window.invoiceId_save = newInvoiceId();
    window.statusId = "pending";
    saveInvoice("new");
    markAsPending();
}

function saveEdited() {
    if (checkInputs()) return;
    window.invoiceId_save = $("invoice_card_id").innerHTML;
    window.statusId = "pending";
    saveInvoice("save");
    markAsPending();
}







// Delete item
function deleteItem(e) {
    //console.log(e.target.id);
    if ($("input_items").children.length > 1) {
        $("node" + e.target.value).remove();

    }
}




//Remove error msg
function removeErrorMsg() {
    inputAr.forEach((element) => {
        if (element[2]) {
            $(element[2]).classList.remove("error-border");
            $(element[2]).parentNode.querySelector(".error-msg").innerHTML = "";
        }
    });

    $("input_alert").innerHTML = "";
}

//Save New invoice
function saveNewInvoice() {
    checkInputs();
    return;
    jsonObj.unshift(JSON.parse(newInvoice));
    //console.log(jsonObj)
    parseInvoices();
    hideDetailsPanel();
}

// New incoice click
function newInvoice_click() {
    removeErrorMsg();
    $("invoice_details").scrollTo(0, 0);

    inputAr.forEach((element) => {
        if ($(element[2])) {
            $(element[2]).value = "";
        }
    });
    $("createdAt_input").value = "1 Jan 2023";
    $("paymentTerms_input").value = 1;
    // Remove items
    $("input_items").innerHTML = "";
    window.itemId = 0;
    addNewItem();

    detailsPanelId = 1;
    newPanelId = 1;

    $("new_invoice_title").style.display = "block";
    $("edit_invoice_title").style.display = "none";

    showDetailsPanel();
}

// Edit invoice click
function editInvoice_click() {
    removeErrorMsg();
    $("invoice_details").scrollTo(0, 0);
    editPanelId = 1;
    detailsPanelId = 1;
    setInvoiceData(window.invoiceId);

    $("new_invoice_title").style.display = "none";
    $("edit_invoice_title").style.display = "block";

    showDetailsPanel();
}

// Show details panel
function showDetailsPanel() {
    if (window.screen_size > 0) {
        $("invoice_details").style.animation = "show-panel 0.5s ";
        $("edit_btns_mobile").style.animation = "show-panel 0.5s";
        $("new_btns_mobile").style.animation = "show-panel 0.5s";
        $("fader").style.animation = "fader 0.5s";
        $("fader").style.display = "block";
    } else {
        $("invoice_details").style.animation = "slide-top 0.3s";
    }
    onResize();
}

// Hide side Panell -----------------------------------------
function hideDetailsPanel() {
    editPanelId = 0;
    newPanelId = 0;
    detailsPanelId = 0;
    //
    if (window.screen_size == 1) {
        $("fader").style.display = "none";
        $("invoice_details").style.animation = "hide-panel 0.5s";
        $("edit_btns_mobile").style.animation = "hide-panel 0.5s";
        $("new_btns_mobile").style.animation = "hide-panel 0.5s";
        setTimeout(function () {
            $("invoice_details").style.display = "none";
        }, 500);
    } else {
        $("fader").style.display = "none";
        $(window.page_id).style.animation = "slide-top 0.3s";
    }
    hideAllPanels();
    onResize();
}

// Go back -------------------------------------------
function backToInvoices() {
    parseInvoices();
    window.page_id = "invoices";
    scrollPage();
    $("invoices").style.animation = "slide-top 0.3s";
    $("invoice_card").style.display = "none";
    $("invoices").style.display = "grid";
    onResize();
}

// Hide all panelsl -----------------------------------------
function hideAllPanels() {
    $("invoices").style.display = "none";
    $("invoice_card").style.display = "none";
    $("invoice_details").style.display = "none";
}
