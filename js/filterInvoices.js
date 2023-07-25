// Filter  ====================================================

document.addEventListener("click", (e) => {
    const btn = e.target.matches("[data-filter-btn]");
    if (!btn && e.target.closest("[data-dropdown]") != null) return;
    let curr_btn;
    if (btn) {
        curr_btn = e.target.closest("[data-dropdown]");
        curr_btn.classList.toggle("active");
    }
    document.querySelectorAll("[data-dropdown].active").forEach((drop) => {
        if (drop === curr_btn) return;
        drop.classList.remove("active");
    });
});

// Filter items click-------------------------------------
document.addEventListener("click", (e) => {
    let curr_btn;
    if (e.target.matches("[data-filter]")) {
        filterInvoices(e.target.dataset.filter);

        curr_btn = e.target.closest("[data-filter]");
        curr_btn.classList.toggle("active");

        document.querySelectorAll("[data-filter].active").forEach((item) => {
            if (item == curr_btn) return;
            item.classList.remove("active");
        });
    }
});

// Filter invoices
var filterId;
function filterInvoices(_status) {
    let count = 0;
    window.filterId = _status;
    jsonObj.forEach((_invoice, n) => {
        if ($("invoice_" + n).dataset.status == _status || _status == "all") {
            let _display;
            window.screen_size == 0 ? (_display = "grid") : (_display = "flex");
            count++;
            $("invoice_" + n).style.display = "block"; //_display
        } else {
            $("invoice_" + n).style.display = "none";
        }

        $("invoices_total").innerHTML = count;
    });
}
