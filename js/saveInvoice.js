function saveInvoice(e) {

    let paymentDue = getDateDue(
        $("createdAt_input").value,
        $("paymentTerms_input").value
    );

    let data =
        "{" +
        '"id": "' +
        window.invoiceId_save +
        '",' +
        '"createdAt": "' +
        getJsonDate($("createdAt_input").value) +
        '",' +
        '"paymentDue": "' +
        paymentDue +
        '",' +
        '"description": "' +
        $("description_input").value +
        '",' +
        '"paymentTerms":"' +
        1 +
        '",' +
        '"clientName": "' +
        $("clientName_input").value +
        '",' +
        '"clientEmail": "' +
        $("clientEmail_input").value +
        '",' +
        '"status": "' +
        window.statusId +
        '",' +
        '"senderAddress": {' +
        '"street": "' +
        $("sender_street_input").value +
        '",' +
        '"city": "' +
        $("sender_city_input").value +
        '",' +
        '"postCode": "' +
        $("sender_postCode_input").value +
        '",' +
        '"country": "' +
        $("sender_country_input").value +
        '"' +
        "}," +
        '"clientAddress": {' +
        '"street": "' +
        $("client_street_input").value +
        '",' +
        '"city": "' +
        $("client_city_input").value +
        '",' +
        '"postCode": "' +
        $("client_postCode_input").value +
        '",' +
        '"country": "' +
        $("client_country_input").value +
        '"' +
        "},";

    data += '"items" : [';
    //console.log($("input_items"))
    let total = 0;
    let itemsTotal = $("input_items").children.length;
    for (var i = 0; i < itemsTotal; i++) {
        if (Number($("item_total" + i).innerHTML) > 0) {
            data +=
                "{" +
                '"name": "' +
                $("item_description" + i).value +
                '",' +
                '"quantity": ' +
                $("item_quantity" + i).value +
                "," +
                '"price": ' +
                $("item_price" + i).value +
                "," +
                '"total": ' +
                $("item_total" + i).innerHTML +
                "}";
            if (i < itemsTotal - 1) {
                data += ",";
            }
            total += Number($("item_total" + i).innerHTML);
        }
    }
    data += "]," + '"total" : ' + total + "}";



    ////
    
    

    invoice_data = data
    if (e == "save") {
        sendRequest("UPDATE_Invoice")
        jsonObj[window.invoiceId] = JSON.parse(data);

    } else if (e == "new") {
        //console.log('{"invoice": '+data+'}')
        sendRequest("INSERT_Invoice")
        jsonObj.unshift(JSON.parse(data))
    }

        hideDetailsPanel();
        parseInvoices();
        setInvoiceData();

}