<?php
header('Content-Type: application/json');
// Allow access only from your frontend (React app)
header("Access-Control-Allow-Origin: http://localhost:5173");
// Allow methods and headers
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // If it's a preflight request, send back an empty response
    http_response_code(200);
    exit(0);
}

require_once 'DbConnector.php';

$dbcon = new DbConnector();
$con = $dbcon->getConnection();

$inputs = file_get_contents('php://input');
$data = json_decode($inputs, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $data['id'];

    try {
        $sql = "DELETE FROM customer WHERE id = ?";
        $stmt = $con->prepare($sql);
        $stmt->execute([$id]);

        echo json_encode(['success' => true, 'message' => 'Customer deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
