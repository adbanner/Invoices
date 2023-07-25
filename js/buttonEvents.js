//Mark as Paidl -----------------------------------------
$("mark_invoice_btn").addEventListener("click", markAsPaid);
$("mark_invoice_btn_mobile").addEventListener("click", markAsPaid);

// Delete invoicel -----------------------------------------
$("delete_invoice_btn").addEventListener("click", showDeletionPopup);
$("delete_invoice_btn_mobile").addEventListener("click", showDeletionPopup);

$("totally_delete_btn").addEventListener("click", totallyDelete);
$("cancel_deletion_btn").addEventListener("click", hideDeletionPopup);

//Edit invoice buttons
$("edit_save_btn").addEventListener("click", saveEdited);
$("edit_cancel_btn").addEventListener("click", hideDetailsPanel);

//New Invoice buttons-----------------------------------------------
$("new_discard_btn").addEventListener("click", hideDetailsPanel);
$("new_save_send_btn").addEventListener("click", saveAndSend);
$("new_save_draft_btn").addEventListener("click", saveAsDraft);

// Show Deatails panel -----------------------------------------
$("new_invoice_btn").addEventListener("click", newInvoice_click);

$("edit_invoice_btn").addEventListener("click", editInvoice_click);
$("edit_invoice_btn_mobile").addEventListener("click", editInvoice_click);

// Go back -------------------------------------------
$("go_back_btn").addEventListener("click", backToInvoices);

document.addEventListener("click", (e)=>{
   e.target.matches("[data-login-btn]")? userLogin() : false;
  
})