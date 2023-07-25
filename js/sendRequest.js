

let user_id = 1;

let login
let pass
let email //= "flash@mavi.com.ua"
let userInfo
let avatar = ""

const root = "https://adbanner.com.ua/works/FrontEnd/api/api.php?";
let url = "";
let newId
let query
let result
let jsonObj = [];

function sendRequest(q) {

  document.body.style.pointerEvents = "none";
  //console.log("query: " + q)
  showMessage(q)
  query = q
  switch (query) {
    case "SELECT_User":
      url = root + "query=SELECT_User&email=" + email + "&pass=" + pass;
      break;

    case "SELECT_Invoices":
      url = root + "query=SELECT_Invoices&user_id=" + user_id + "&avatar=" + avatar;
      break;

    case "UPDATE_Invoice":
      url = root + "query=UPDATE_Invoice&invoice_id=" + invoice_id +
        "&user_id=" + user_id +
        "&invoice=" + invoice_data;
      break;

    case "UPDATE_Status":
      url = root + "query=UPDATE_Status&invoice_id=" + invoice_id +
        "&user_id=" + user_id + "&status=paid";
      break;

    case "INSERT_Invoice":
      url = root + "query=INSERT_Invoice&invoice_id=" + window.invoiceId_save +
        "&user_id=" + user_id +
        "&invoice=" + invoice_data;
      break;
    case "DELETE_Invoice":
      url = root + "query=DELETE_Invoice&invoice_id=" + invoice_id +
        "&user_id=" + user_id;
      break;

  }

  // console.log(url)
  // Send request
  fetch(url)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      result = JSON.parse(JSON.stringify(data))[0]
      console.log("result: "+result)
      
      document.body.style.pointerEvents = "all";
      hideLoader()
      hideMessage()


      if(!result) return loginError();

      // Select query action
      switch (query) {
        //--------------------------------------
        case "SELECT_User":
          // Check user 
          if (result.email) {
            user_id = Number(result.id)
            //return;
            sendRequest("SELECT_Invoices")
            $("login_popup").style.display = "none";

            result.avatar ? avatar = result.avatar : false;
            setAvatar()
          };
          break;

        //--------------------------------------
        case "SELECT_Invoices":
          $("main").style.display = "grid";
          jsonObj = JSON.parse(JSON.stringify(data))
          let newJson = []
          jsonObj.forEach((_invoice) => {
            newJson.push(JSON.parse(_invoice.invoice))
          })
          jsonObj = newJson

          parseInvoices();
          break;

        //--------------------------------------
        case "UPDATE_Invoice":
          break;

        //--------------------------------------
        case "UPDATE_Status":
          break;

        //--------------------------------------
        case "INSERT_Invoice":

          break;
      }
      

      return true;
    })
    .catch(err => {

      document.body.style.pointerEvents = "all";
      hideMessage()
      hideLoader()
      console.log("Error: " + err);
     return true;
    });
}


//sendRequest("SELECT_User")



function showMessage(txt) {
  $("message").innerHTML = txt
  $("message").classList.toggle("active")
}

function hideMessage() {
  $("message").classList.remove("active")
}
