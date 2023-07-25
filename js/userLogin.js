 //document.querySelector("[data-login]").value = "flash@mavi.com.ua"
 //document.querySelector("[data-pass]").value = "11111"

function userLogin() {
    let error = false
    $("error-login").style.display = "none"
    //Login
    if ($("login").value.length < 10) {
        error = true
        $("login").classList.add("error-border")
    } else {
        $("login").classList.remove("error-border")
    }

    // Password
    if ($("pass").value.length < 4) {
        error = true
        $("pass").classList.add("error-border")
    } else {
        $("pass").classList.remove("error-border")
    }

    if (error) {
        loginError()
        return;
    }

    showLoader("login")

    email = $("login").value
    pass = $("pass").value

    let login_status = sendRequest("SELECT_User")
    // ? console.log("logged in"): console.log("login error")//loginError(); 
}

function loginError() {
    $("error-login").style.display = "block"
}

function testAccount(){
    $("login").value = "test@email.com"
    $("pass").value = "12345"
    userLogin()
}