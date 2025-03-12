<?php
require_once(__DIR__ . "/../../connection/connection.php");

$sql = "CREATE TABLE IF NOT EXISTS users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";


if ($conn->query($sql) == true) {
    echo "Table users created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


?>