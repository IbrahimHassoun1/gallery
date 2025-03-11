<?php
require_once(__DIR__ . "/../../connection/connection.php");

$sql = "CREATE TABLE IF NOT EXISTS images
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    path VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";


if ($conn->query($sql) == true) {
    echo "Table users created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


?>