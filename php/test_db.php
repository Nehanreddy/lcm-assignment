<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = mysqli_connect('localhost', 'root', '', 'math_game_db', 3307);

if ($conn) {
    $query = "SELECT COUNT(*) as count FROM users";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $data = mysqli_fetch_assoc($result);
        echo json_encode([
            'success' => true, 
            'message' => 'Database connected successfully!',
            'user_count' => $data['count']
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Query failed: ' . mysqli_error($conn)
        ]);
    }
    mysqli_close($conn);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . mysqli_connect_error()
    ]);
}
?>
