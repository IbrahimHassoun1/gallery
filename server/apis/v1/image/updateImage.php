<?php
header("Content-Type: application/json");
require_once(__DIR__ . '/../../../models/Image.php');
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing image id."]);
        return;
    }
    if (isset($data['id']) && isset($data['title']) && isset($data['description'])) {
        $image = new Image();
        $image->setId($data['id']);
        $image->setTitle($data['title']);
        $image->setDescription($data['description']);

        if ($image->update()) {
            http_response_code(200);
            echo json_encode(["message" => "Image updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update image."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Incomplete data."]);
    }
}

?>