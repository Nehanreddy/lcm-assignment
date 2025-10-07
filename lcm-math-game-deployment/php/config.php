<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins for production
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

// Production database configuration
// IMPORTANT: Update these with hosting credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user'); // Update this
define('DB_PASS', 'your_db_password'); // Update this
define('DB_NAME', 'math_game_db');
define('DB_PORT', 3306); // Usually 3306 on shared hosting

// Create connection
function get_db_connection() {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if (!$conn) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit();
    }
    
    mysqli_set_charset($conn, "utf8");
    return $conn;
}
?>
