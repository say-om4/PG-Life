
<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require "../../config/database.php";

$name = $_POST["name"];
$city = $_POST["city"];
$state = isset($_POST["state"]) ? $_POST["state"] : "";
$address = $_POST["address"];
$price = $_POST["price"];
$user_id = isset($_POST["user_id"]) && $_POST["user_id"] !== "null" && $_POST["user_id"] !== "" ? intval($_POST["user_id"]) : null;

$user_role = "user";
if ($user_id !== null) {
    $role_stmt = $conn->prepare("SELECT role FROM users WHERE id = ?");
    $role_stmt->bind_param("i", $user_id);
    $role_stmt->execute();
    $role_res = $role_stmt->get_result();
    if ($role_res->num_rows > 0) {
        $user_role = $role_res->fetch_assoc()["role"];
    }
    $role_stmt->close();
}

$rating = isset($_POST["rating"]) ? floatval($_POST["rating"]) : 5.0;
$rating_setting = isset($_POST["rating_setting"]) ? $_POST["rating_setting"] : "reviews";

// Enforce security: non-admins cannot customize starting rating or rating setting
if ($user_role !== "admin") {
    $rating = 5.0;
    $rating_setting = "reviews";
}

$room_type = $_POST["room_type"];
$gender = $_POST["gender"];
$food = isset($_POST["food"]) ? intval($_POST["food"]) : 1;
$wifi = isset($_POST["wifi"]) ? intval($_POST["wifi"]) : 1;
$bathroom = $_POST["bathroom"];
$parking = isset($_POST["parking"]) ? intval($_POST["parking"]) : 0;
$power_backup = isset($_POST["power_backup"]) ? intval($_POST["power_backup"]) : 1;
$description = $_POST["description"];
$status = isset($_POST["status"]) ? $_POST["status"] : "Vacant";
$property_type = isset($_POST["property_type"]) ? $_POST["property_type"] : "PG";

$independent = isset($_POST["independent"]) ? intval($_POST["independent"]) : 0;
$contact_display = isset($_POST["contact_display"]) ? $_POST["contact_display"] : "both";
$phone2 = isset($_POST["phone2"]) && $_POST["phone2"] !== "" ? $_POST["phone2"] : null;

/* Upload Image */
$imageName = "default.jpg";
if (isset($_FILES["image"]) && $_FILES["image"]["error"] == UPLOAD_ERR_OK) {
    $imageName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetPath = "../../uploads/" . $imageName;
    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
        echo json_encode([
            "success" => false,
            "message" => "Image Upload Failed"
        ]);
        exit;
    }
}

$stmt = $conn->prepare("INSERT INTO pgs
(user_id, name, city, state, address, price, rating, room_type, gender, food, wifi, bathroom, parking, power_backup, independent, image, description, status, property_type, rating_setting, contact_display, phone2)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

$stmt->bind_param(
    "issssddssiisiiisssssss",
    $user_id,
    $name,
    $city,
    $state,
    $address,
    $price,
    $rating,
    $room_type,
    $gender,
    $food,
    $wifi,
    $bathroom,
    $parking,
    $power_backup,
    $independent,
    $imageName,
    $description,
    $status,
    $property_type,
    $rating_setting,
    $contact_display,
    $phone2
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Listing Added Successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Database Error: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>

