<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once(__DIR__ . '/../../../models/User.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);
    $user = new User();
    $user->setName($data['name']);
    $user->setEmail($data['email']);
    $user->setPassword($data['password']);
    $user->createUser();
}


?>