<?php
header("Content-Type: application/json");
require_once(__DIR__ . '/../../../models/Image.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $data = json_decode(file_get_contents("php://input"), true);
    $image = new Image();
    $image->readAll();
}
?>