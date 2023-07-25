// Window resize events------------------------
window.addEventListener("resize", onResize);

function onResize() {
    var style = getComputedStyle(document.body);
    window.screen_size = style.getPropertyValue("--screen-size");

    $("card_btns_mobile").style.display = "none";
    $("edit_btns_mobile").style.display = "none";
    $("new_btns_mobile").style.display = "none";

    // Mobile
    if (window.screen_size == 0) {
        $(window.page_id).style.display = "grid";

        if (detailsPanelId) {
            $(window.page_id).style.display = "none";
            $("fader").style.display = "none";
            $("invoice_details").style.display = "block";
            $("invoice_details").style.position = "static";

            if (editPanelId) {
                $("edit_btns_mobile").style.display = "flex";
            }
            if (newPanelId) {
                $("new_btns_mobile").style.display = "flex";
            }
        }

        // Desktop
    }
    if (window.screen_size > 0) {
        $(window.page_id).style.display = "grid";
        if (detailsPanelId) {
            $("fader").style.display = "block";
            $("invoice_details").style.display = "block";
            $("invoice_details").style.position = "fixed";

            if (editPanelId) {
                $("edit_btns_mobile").style.display = "flex";
                $("edit_btns_mobile").style.position = "fixed";
            }
            if (newPanelId) {
                $("new_btns_mobile").style.display = "flex";
                $("new_btns_mobile").style.position = "fixed";
            }
        }
    }

    if (
        window.page_id == "invoice_card" &&
        window.screen_size == 0 &&
        !detailsPanelId
    ) {
        $("card_btns_mobile").style.display = "flex";
    } else {
        $("card_btns_mobile").style.display = "none";
    }
    //console.log('page_id: '+window.page_id);
}
onResize();
