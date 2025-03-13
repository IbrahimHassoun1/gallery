<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once __DIR__ . '/../../../models/Image.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["owner_id"])) {
        $image = new Image();
        $image->setOwnerId($data["owner_id"]);
        $image->readAll();
    } else {
        echo json_encode(["message" => "send owner id"]);
        http_response_code(400);
        exit();
    }


} else {
    echo json_encode(["message" => "Invalid request method"]);
    http_response_code(405);
    exit();
}

