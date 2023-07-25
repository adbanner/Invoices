// Get invoice data
function invoiceData(id, name) {
    
    let invoiceObj = jsonObj[id]
    var result;
    switch (name) {
        case "id":
            result = invoiceObj.id;
            break;
        case "createdAt":
            result = getDateFormat(invoiceObj.createdAt);
            break;
        case "paymentDue":
            result = getDateFormat(invoiceObj.paymentDue);
            break;
        case "description":
            result = invoiceObj.description;
            break;
        case "paymentTerms":
            result = invoiceObj.paymentTerms;
            break;
        case "clientName":
            result = invoiceObj.clientName;
            break;
        case "clientEmail":
            result = invoiceObj.clientEmail;
            break;
        case "status":
            result = invoiceObj.status;
            break;
        case "status_name":
            var status = invoiceObj.status;
            result = status.charAt(0).toUpperCase() + status.slice(1);
            break;
        // Sender Adress
        case "sender_street":
            result = invoiceObj.senderAddress.street;
            break;
        case "sender_city":
            result = invoiceObj.senderAddress.city;
            break;
        case "sender_postCode":
            result = invoiceObj.senderAddress.postCode;
            break;
        case "sender_country":
            result = invoiceObj.senderAddress.country;
            break;
        // Client Adress
        case "client_street":
            result = invoiceObj.clientAddress.street;
            break;
        case "client_city":
            result = invoiceObj.clientAddress.city;
            break;
        case "client_postCode":
            result = invoiceObj.clientAddress.postCode;
            break;
        case "client_country":
            result = invoiceObj.clientAddress.country;
            break;

        case "total":
            result = getPriceFormat(invoiceObj.total);
            break;
    }
    //console.log("name: "+name + " , result: "+ result.split(' '))
    //result ? return result : return '';

    result = result.toString();
    if (result && result.split(" ")[0] != "undefined") {
        //console.log(result)
        return result;
    } else {
        //console.log(result)
        return "";
    }
    //  Parse Items
}