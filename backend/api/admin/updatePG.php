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

$pg_id = intval($data["id"]);
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

// Fetch the current owner, rating, and rating_setting of the listing
$owner_stmt = $conn->prepare("SELECT user_id, rating, rating_setting FROM pgs WHERE id = ?");
$owner_stmt->bind_param("i", $pg_id);
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
$current_data = $owner_res->fetch_assoc();
$owner_id = $current_data["user_id"];
$db_rating = $current_data["rating"];
$db_rating_setting = $current_data["rating_setting"];
$owner_stmt->close();

// If the requester is not admin and not the owner of the listing, deny access
if ($user_role !== "admin" && $owner_id !== $requester_id) {
    echo json_encode([
        "success" => false,
        "message" => "Permission Denied. You do not own this listing."
    ]);
    exit;
}

$rating = isset($data["rating"]) ? floatval($data["rating"]) : 5.0;
$rating_setting = isset($data["rating_setting"]) ? $data["rating_setting"] : "reviews";
$contact_display = isset($data["contact_display"]) ? $data["contact_display"] : "both";
$phone2 = isset($data["phone2"]) && $data["phone2"] !== "" ? $data["phone2"] : null;

// If requester is not admin, prevent modifying rating and rating_setting
if ($user_role !== "admin") {
    $rating = $db_rating;
    $rating_setting = $db_rating_setting;
}

$stmt = $conn->prepare("
UPDATE pgs SET
name=?,
city=?,
state=?,
address=?,
price=?,
rating=?,
room_type=?,
gender=?,
food=?,
wifi=?,
bathroom=?,
parking=?,
power_backup=?,
independent=?,
image=?,
description=?,
status=?,
property_type=?,
rating_setting=?,
contact_display=?,
phone2=?
WHERE id=?
");

$stmt->bind_param(
    "ssssddssiisiiisssssssi",
    $data["name"],
    $data["city"],
    $data["state"],
    $data["address"],
    $data["price"],
    $rating,
    $data["room_type"],
    $data["gender"],
    $data["food"],
    $data["wifi"],
    $data["bathroom"],
    $data["parking"],
    $data["power_backup"],
    $data["independent"],
    $data["image"],
    $data["description"],
    $data["status"],
    $data["property_type"],
    $rating_setting,
    $contact_display,
    $phone2,
    $pg_id
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Listing Updated Successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Update Failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>