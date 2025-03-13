<?php
header("Content-Type: application/json");
require_once(__DIR__ . '/../../../models/Image.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["image"])) {
        $image = new Image();
        $image->setImage($data["image"]);
        $image->setTitle($data["title"]);
        $image->setDescription($data["description"]);
        $image->setOwnerId($data["owner_id"]);
        $image->create();

    } else {
        echo json_encode(["message" => "No image uploaded"]);
        http_response_code(400);
        exit();
    }
} else {
    echo json_encode(["message" => "Method not allowed"]);
    http_response_code(405);
}
?>