<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["user_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No Data Received or User ID missing"
    ]);
    exit;
}

$userId = intval($data["user_id"]);
$full_name = trim($data["full_name"]);
$email = trim($data["email"]);
$phone = trim($data["phone"]);

if (empty($full_name) || empty($email) || empty($phone)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields (name, email, phone) are required"
    ]);
    exit;
}

// 1. Check if email already exists for another user
$check = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
$check->bind_param("si", $email, $userId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email is already in use by another user"
    ]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// 2. Perform the update
$success = false;
if (!empty($data["password"])) {
    $password = password_hash($data["password"], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET full_name = ?, email = ?, phone = ?, password = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $full_name, $email, $phone, $password, $userId);
    $success = $stmt->execute();
    $stmt->close();
} else {
    $stmt = $conn->prepare("UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $full_name, $email, $phone, $userId);
    $success = $stmt->execute();
    $stmt->close();
}

if ($success) {
    // Fetch updated user info to return to frontend
    $stmt = $conn->prepare("SELECT id, full_name, email, phone, role FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $res = $stmt->get_result();
    $updatedUser = $res->fetch_assoc();
    $stmt->close();

    echo json_encode([
        "success" => true,
        "message" => "Profile updated successfully",
        "user" => $updatedUser
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update profile"
    ]);
}

$conn->close();
?>
