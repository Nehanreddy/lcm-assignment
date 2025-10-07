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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

session_start();

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

$username = isset($data['username']) ? mysqli_real_escape_string($conn, trim($data['username'])) : '';
$email = isset($data['email']) ? mysqli_real_escape_string($conn, trim($data['email'])) : '';
$password = isset($data['password']) ? $data['password'] : '';

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    mysqli_close($conn);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    mysqli_close($conn);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    mysqli_close($conn);
    exit();
}

$check_query = "SELECT id FROM users WHERE username = '$username' OR email = '$email'";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
    mysqli_close($conn);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$insert_query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

if (mysqli_query($conn, $insert_query)) {
    $user_id = mysqli_insert_id($conn);
    
    $progress_query = "INSERT INTO game_progress (user_id) VALUES ($user_id)";
    mysqli_query($conn, $progress_query);
    
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $user_id,
            'username' => $username
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
