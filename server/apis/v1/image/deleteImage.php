<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require_once(__DIR__ . '/../../../models/Image.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $image = new Image();
    $image->setId($data["id"]);
    $image->delete();

}


?>