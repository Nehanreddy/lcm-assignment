<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

$conn = mysqli_connect('localhost', 'root', '', 'math_game_db', 3307);

if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . mysqli_connect_error()]);
    exit();
}

mysqli_set_charset($conn, "utf8");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

$user_id = $_SESSION['user_id'];
$score = isset($data['score']) ? intval($data['score']) : 0;
$level = isset($data['level']) ? intval($data['level']) : 1;

$insert_query = "INSERT INTO game_scores (user_id, score, level) VALUES ($user_id, $score, $level)";

if (mysqli_query($conn, $insert_query)) {
    $update_query = "UPDATE game_progress SET total_score = total_score + $score, current_level = $level WHERE user_id = $user_id";
    mysqli_query($conn, $update_query);
    
    echo json_encode(['success' => true, 'message' => 'Score saved']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save score: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
