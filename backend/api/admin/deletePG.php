<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No Data Received or Listing ID missing"
    ]);
    exit;
}

$id = intval($data["id"]);
$requester_id = isset($data["requester_id"]) ? intval($data["requester_id"]) : 0;

if ($requester_id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access. No requester ID provided."
    ]);
    exit;
}

// Check role of requester
$role_stmt = $conn->prepare("SELECT role FROM users WHERE id = ?");
$role_stmt->bind_param("i", $requester_id);
$role_stmt->execute();
$role_res = $role_stmt->get_result();
if ($role_res->num_rows == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access. User does not exist."
    ]);
    $role_stmt->close();
    exit;
}
$user_role = $role_res->fetch_assoc()["role"];
$role_stmt->close();

// Fetch the owner of the listing
$owner_stmt = $conn->prepare("SELECT user_id FROM pgs WHERE id = ?");
$owner_stmt->bind_param("i", $id);
$owner_stmt->execute();
$owner_res = $owner_stmt->get_result();
if ($owner_res->num_rows == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Listing not found."
    ]);
    $owner_stmt->close();
    exit;
}
$owner_id = $owner_res->fetch_assoc()["user_id"];
$owner_stmt->close();

// If the requester is not admin and not the owner of the listing, deny access
if ($user_role !== "admin" && $owner_id !== $requester_id) {
    echo json_encode([
        "success" => false,
        "message" => "Permission Denied. You do not own this listing."
    ]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM pgs WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Listing Deleted Successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Delete Failed"
    ]);
}

$stmt->close();
$conn->close();

?>