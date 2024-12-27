<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'DbConnector.php';

$dbcon = new DbConnector();
$con = $dbcon->getConnection();

$inputs = file_get_contents('php://input');
$data = json_decode($inputs, true);

if (isset($data['id'], $data['fname'], $data['lname'], $data['address'], $data['email'], $data['mobile'])) {
    $id = $data['id'];
    $fname = $data['fname'];
    $lname = $data['lname'];
    $address = $data['address'];
    $email = $data['email'];
    $mobile = $data['mobile'];

    try {
        $sql = "UPDATE customer SET fname = ?, lname = ?, address = ?, email = ?, mobile = ? WHERE id = ?";
        $stmt = $con->prepare($sql);
        $stmt->execute([$fname, $lname, $address, $email, $mobile, $id]);

        echo json_encode(['success' => true, 'message' => 'Customer updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
}
