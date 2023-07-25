// Add New Item
$("add_new_item_btn").addEventListener("click", addNewItem);

function addNewItem(id) {
    
    const node = document.createElement("div");
    node.id = "node" + itemId;
    let title;
    itemId == 0 ? (title = "_first") : (title = "");
    node.innerHTML +=
        ' <div id="item' +
        itemId +
        '" value=' +
        itemId +
        ' class="item-list grid gap-400"> <div class="grid gap-200"> <p class="item-title' +
        title +
        ' ff-300">Item Name</p><input data-input id="item_description' +
        itemId +
        '" class="input"></input> </div><div class="new-list-grid grid gap-300"> <div class="grid gap-200"> <p class="item-title' +
        title +
        ' ff-300">Qty.</p><input data-input id="item_quantity' +
        itemId +
        '"  class="input" type="number" maxlength="6"></input> </div><div class="grid gap-200"> <p class="item-title' +
        title +
        ' ff-300">Price</p><input data-input id="item_price' +
        itemId +
        '" class="input" type="number" inputmode="numeric" pattern="d*"></input> </div><div class="grid gap-200"> <p class="item-title' +
        title +
        ' ff-300">Total</p><p id="item_total' +
        itemId +
        '" class="total-field">0</p></div><div class="grid gap-200"> <p class="ff-300"></p><div id="bin' +
        itemId +
        '" class="bin btn"> </bin> </div></div></div></div>';

    $("input_items").appendChild(node);

    $("item" + itemId).value = itemId;
    $("bin" + itemId).value = itemId;
    $("bin" + itemId).addEventListener("click", deleteItem);
    $("item" + itemId).style.animation = "addItem 0.3s forwards";
    $("item_quantity" + itemId).value = "";

   

    for (var i = 0; i < 1; i++) {
        $("item_quantity" + itemId).addEventListener("input", countTotal);
        $("item_price" + itemId).addEventListener("input", countTotal);
        $("item" + i).value = itemId;
        console.log($("item" + i).value);
    }

    itemId++;
    $("invoice_details").scrollTo(0, $("invoice_details").scrollHeight);
}