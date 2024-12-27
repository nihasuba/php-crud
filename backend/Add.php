<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once 'DbConnector.php'; // Include the DbConnector class

$dbcon = new DbConnector();
$con = $dbcon->getConnection();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputs = file_get_contents('php://input');
    $customer = json_decode($inputs, true);
    $errors = [];

    if ($customer) {
        $sanitizedemail = filter_var($customer['email'], FILTER_SANITIZE_EMAIL);
        $Validatedemail = filter_var($sanitizedemail, FILTER_VALIDATE_EMAIL);
        if ($Validatedemail) {
            $email = strtolower($Validatedemail);
        } else {
            $errors[] = "Invalid Email";
        }
    }
    if (!preg_match("/^\d{10}$/", $customer['mobile'])) {
        $errors[] = "Invalid Contact Number";
    } else {
        $mobile = $customer['mobile'];
    }
    if (empty($customer['address'])) {
        $errors[] = "Address is required";
    } else {
        $address = htmlspecialchars($customer['address']);
    }
    if (empty($customer['fname'])) {
        $errors[] = "First Name is required";
    } else {
        $fname = htmlspecialchars($customer['fname']);
    }
    if (empty($customer['lname'])) {
        $errors[] = "Last Name is required";
    } else {
        $lname = htmlspecialchars($customer['lname']);
    }

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => 'Validation failed', 'error' => $errors]);
        exit;
    }

    try {
        $sql = "INSERT INTO customer(fname, lname, address, email, mobile) VALUES(?, ?, ?, ?, ?)";
        $pstmt = $con->prepare($sql);
        $pstmt->bindParam(1, $fname);
        $pstmt->bindParam(2, $lname);
        $pstmt->bindParam(3, $address);
        $pstmt->bindParam(4, $email);
        $pstmt->bindParam(5, $mobile);

        $r = $pstmt->execute();

        if ($r) {
            echo json_encode(['success' => true, 'message' => "Registered"]);
        } else {
            echo json_encode(['success' => false, 'message' => "Error in SQL query"]);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Request Method"]);
}
?>
