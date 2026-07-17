<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

$sql = "SELECT pgs.*, users.full_name AS owner_name, 
        (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviews.pg_id = pgs.id) AS avg_customer_rating
        FROM pgs 
        LEFT JOIN users ON pgs.user_id = users.id 
        ORDER BY pgs.id DESC";

$result = $conn->query($sql);

$pgs = [];

while ($row = $result->fetch_assoc()) {
    $avg_rating = floatval($row['avg_customer_rating']);
    if ($row['rating_setting'] === 'reviews' && $avg_rating > 0) {
        $row['rating'] = number_format($avg_rating, 1);
    }
    $pgs[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $pgs
]);

$conn->close();

?>