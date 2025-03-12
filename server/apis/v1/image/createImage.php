<?php
header("Content-Type: application/json");
require_once(__DIR__ . '/../../../models/Image.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["image"])) {
        $image = new Image();
        $image->setImage($_FILES["image"]["tmp_name"]);
        $image->setTitle($_POST['title']);
        $image->setDescription($_POST['description']);
        $image->setPath($_FILES["image"]["name"]);
        $image->setOwnerId($_POST['owner_id']);
        if ($image->create()) {
            echo json_encode(["message" => "Image uploaded successfully"]);
            http_response_code(201);
        }
    } else {
        echo json_encode(["message" => "No image uploaded"]);
        http_response_code(400);
    }
} else {
    echo json_encode(["message" => "Method not allowed"]);
    http_response_code(405);
}
?>