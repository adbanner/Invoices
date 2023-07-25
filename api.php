<?php


header("Access-Control-Allow-Origin: * ");
header('Content-Type: application/json');

$servername = "adbanner.mysql.tools";
$username = "adbanner_invoices";
$password = "ud9mB%5B8!";
$dbname = "adbanner_invoices";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// GET vars from URL
$query = $_GET['query'];
$email = $_GET['email'];
//$email = $_GET"flash@mavi.com.ua";
$avatar = $_GET['avatar'];
$user_id = $_GET['user_id'];
$invoice_id = $_GET['invoice_id'];
$invoice = $_GET['invoice'];
$status = $_GET['status'];

$params = "id, first_name, last_name, email, avatar";



// Update avatar
if ($avatar && $query == "SELECT_Invoices") {
    $sql = "UPDATE Users SET avatar='$avatar' WHERE id=$user_id ;";
}
$result = mysqli_query($conn, $sql);




switch ($query) {
    case "SELECT_User":
        $sql = "SELECT $params FROM Users WHERE email='$email' ";
        break;
    case "SELECT_Invoices":
        $sql = "SELECT invoice FROM Invoices WHERE user_id=$user_id ORDER BY _id DESC";
        break;
    case "UPDATE_Invoice":
        $sql = "UPDATE Invoices SET invoice='$invoice' WHERE id='$invoice_id' AND user_id=$user_id";
        break;
    case "INSERT_Invoice":
        $sql = "INSERT INTO Invoices (user_id, id, invoice) VALUE ($user_id, '$invoice_id', '$invoice')";
        break;
    case "UPDATE_Status":
        $sql = "UPDATE Invoices SET invoice = JSON_SET(invoice, '$.status', '$status') 
                WHERE user_id=$user_id AND invoice->> '$.id' = '$invoice_id' ";
        break;
    case "DELETE_Invoice":
        $sql = "DELETE FROM Invoices WHERE id='$invoice_id' AND user_id=$user_id";
        break;
}



//echo json_encode($sql);


$result = mysqli_query($conn, $sql);
$error = mysqli_error($conn);



if (!$error) {
    $jsonArray = array();
    if (mysqli_num_rows($result)) {
        while ($row = $result->fetch_assoc()) {
            $jsonArray[] = $row;
        }
        echo json_encode($jsonArray);
    }
    else{
        echo json_encode($result);    
    }

} else {
    echo json_encode(false);
}


mysqli_close($conn);

?>