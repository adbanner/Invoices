// Chenge theme ------------------------------------
$("theme_btn").addEventListener("click", changeTheme);

function changeTheme() {
    //console.log("click:"+ e.target.value)
    if (window.theme == "dark") {
        theme = "light";

        $("theme_btn").classList.remove("active");
        // Background colors
        r.style.setProperty("--clr-bg-1", "var(--clr-primary-12)");
        r.style.setProperty("--clr-bg-2", "var(--clr-primary-3)");
        r.style.setProperty("--clr-bg-3", "var(--clr-primary-4)");
        r.style.setProperty("--clr-bg-4", "var(--clr-primary-8)");

        r.style.setProperty("--clr-new-item", "var(--clr-primary-4)");

        // Font colors
        r.style.setProperty("--ff-clr-100", "var(--clr-primary-100)");
        r.style.setProperty("--ff-clr-200", "var(--clr-primary-5)");
        r.style.setProperty("--ff-clr-300", "var(--clr-primary-5)");
        r.style.setProperty("--ff-clr-400", "var(--clr-primary-6)");
        r.style.setProperty("--ff-clr-800", "var(--clr-primary-8)");

        r.style.setProperty("--ff-clr-3-to-5", "var(--clr-primary-3)");
        r.style.setProperty("--ff-clr-5-to-7", "var(--clr-primary-5)");
        r.style.setProperty("--ff-clr-4-to-13", "var(--clr-primary-4)");
        r.style.setProperty("--ff-clr-100-to-7", "var(--clr-primary-100)");

        // Border colors
        r.style.setProperty("--input-border-clr", "var(--clr-primary-4)");

        r.style.setProperty("--draft", "var(--clr-primary-5)");
    } else {
        window.theme = "dark";

        //$("theme_btn").classList.add("theme-btn-light")
        $("theme_btn").classList.toggle("active");
        // Background colors
        r.style.setProperty("--clr-bg-1", "var(--clr-primary-11)");
        r.style.setProperty("--clr-bg-2", "var(--clr-primary-100)");
        r.style.setProperty("--clr-bg-3", "var(--clr-primary-11)");
        r.style.setProperty("--clr-bg-4", "var(--clr-primary-3)");

        r.style.setProperty("--clr-new-item", "var(--clr-primary-5)");

        // Font colors
        r.style.setProperty("--ff-clr-100", "var(--clr-primary-3)");
        r.style.setProperty("--ff-clr-200", "var(--clr-primary-7)");
        r.style.setProperty("--ff-clr-300", "var(--clr-primary-7)");
        r.style.setProperty("--ff-clr-400", "var(--clr-primary-6)");
        r.style.setProperty("--ff-clr-800", "var(--clr-primary-8)");

        r.style.setProperty("--ff-clr-3-to-5", "var(--clr-primary-5)");
        r.style.setProperty("--ff-clr-5-to-7", "var(--clr-primary-7)");
        r.style.setProperty("--ff-clr-4-to-13", "var(--clr-primary-13)");
        r.style.setProperty("--ff-clr-100-to-7", "var(--clr-primary-7)");

        // Border colors
        r.style.setProperty("--input-border-clr", "var(--clr-primary-5)");

        r.style.setProperty("--draft", "var(--draft-light)");
    }
}
