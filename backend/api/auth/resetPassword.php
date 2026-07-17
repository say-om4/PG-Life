<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);
    exit;
}

$email = trim($data["email"]);
$phone = trim($data["phone"]);
$newPassword = $data["password"];

if (empty($email) || empty($phone) || empty($newPassword)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields (Email, Phone, and New Password) are required."
    ]);
    exit;
}

// Check if user exists with matching email
$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode([
        "success" => false,
        "message" => "No account found with this email address."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$user = $result->fetch_assoc();
$stmt->close();

// Verify phone number match
if ($user["phone"] !== $phone) {
    echo json_encode([
        "success" => false,
        "message" => "Verification failed. The phone number does not match our records."
    ]);
    $conn->close();
    exit;
}

// Hash and update password
$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
$updateStmt = $conn->prepare("UPDATE users SET password=? WHERE id=?");
$updateStmt->bind_param("si", $hashedPassword, $user["id"]);

if ($updateStmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Password updated successfully! Please log in with your new password."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update password. Please try again."
    ]);
}

$updateStmt->close();
$conn->close();
?>
