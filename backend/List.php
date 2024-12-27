<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173"); // Replace with your frontend's URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once 'DbConnector.php';

$dbcon = new DbConnector();
$con = $dbcon->getConnection();

try {
    $sql = "SELECT * FROM customer"; // Adjust the table name if needed
    $stmt = $con->prepare($sql);
    $stmt->execute();

    $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $customers]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
