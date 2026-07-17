<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

if (!isset($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "PG ID is required"
    ]);
    exit;
}

$id = intval($_GET['id']);

$stmt = $conn->prepare("
    SELECT pgs.*, users.full_name AS owner_name, users.email AS owner_email, users.phone AS owner_phone,
    (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviews.pg_id = pgs.id) AS avg_customer_rating
    FROM pgs
    LEFT JOIN users ON pgs.user_id = users.id
    WHERE pgs.id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $pg = $result->fetch_assoc();
    
    $avg_rating = floatval($pg['avg_customer_rating']);
    if ($pg['rating_setting'] === 'reviews' && $avg_rating > 0) {
        $pg['rating'] = number_format($avg_rating, 1);
    }
    
    $stmt->close();

    // Fetch reviews
    $reviews_stmt = $conn->prepare("
        SELECT reviews.*, users.full_name AS user_name 
        FROM reviews 
        LEFT JOIN users ON reviews.user_id = users.id 
        WHERE reviews.pg_id = ? 
        ORDER BY reviews.created_at DESC
    ");
    $reviews_stmt->bind_param("i", $id);
    $reviews_stmt->execute();
    $reviews_res = $reviews_stmt->get_result();
    $reviews = [];
    while ($row = $reviews_res->fetch_assoc()) {
        $reviews[] = $row;
    }
    $reviews_stmt->close();

    $pg['reviews'] = $reviews;

    echo json_encode([
        "success" => true,
        "data" => $pg
    ]);

} else {
    $stmt->close();
    echo json_encode([
        "success" => false,
        "message" => "PG Not Found"
    ]);

}

$conn->close();

?>