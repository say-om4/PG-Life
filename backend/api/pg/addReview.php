<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["user_id"]) || !isset($data["pg_id"]) || !isset($data["rating"])) {
    echo json_encode([
        "success" => false,
        "message" => "Required data (user_id, pg_id, rating) is missing."
    ]);
    exit;
}

$user_id = intval($data["user_id"]);
$pg_id = intval($data["pg_id"]);
$rating = intval($data["rating"]);
$review_text = isset($data["review_text"]) ? trim($data["review_text"]) : "";

if ($rating < 1 || $rating > 5) {
    echo json_encode([
        "success" => false,
        "message" => "Rating must be between 1 and 5 stars."
    ]);
    exit;
}

// 1. Verify that user is not the host of this PG
$check_owner = $conn->prepare("SELECT user_id FROM pgs WHERE id = ?");
$check_owner->bind_param("i", $pg_id);
$check_owner->execute();
$owner_res = $check_owner->get_result();

if ($owner_res->num_rows == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Listing not found."
    ]);
    $check_owner->close();
    exit;
}

$owner_id = $owner_res->fetch_assoc()["user_id"];
$check_owner->close();

if ($owner_id !== null && intval($owner_id) === $user_id) {
    echo json_encode([
        "success" => false,
        "message" => "Permission Denied: You cannot review or rate your own property."
    ]);
    exit;
}

// 2. Insert or update the review
$stmt = $conn->prepare("
    INSERT INTO reviews (pg_id, user_id, rating, review_text)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = VALUES(rating), review_text = VALUES(review_text)
");
$stmt->bind_param("iiis", $pg_id, $user_id, $rating, $review_text);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Review submitted successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error submitting review: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>
