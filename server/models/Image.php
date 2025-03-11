<?php
require_once(__DIR__ . "/Image.Skeleton.php");
class Image extends Image_Skeleton
{
    private static $conn;

    public static function connectDatabase()
    {
        $conn = new mysqli("localhost", "root", "", "gallery");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            self::$conn = $conn;
        }
        return self::$conn;
    }
    public function __construct()
    {

    }
    public function create()
    {
        self::connectDatabase();
        if ($this->conn == null) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        $sql = "INSERT INTO images (title, description, path, owner_id) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $title = $this->getTitle();
        $description = $this->getDescription();
        $path = $this->getPath();
        $owner_id = $this->getOwnerId();
        $stmt->bind_param("sssi", $title, $description, $path, $owner_id);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function read()
    {
        self::connectDatabase();
        if ($this->conn == null) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        $sql = "SELECT * FROM images WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $id = $this->getId();
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }
    public function update()
    {
        self::connectDatabase();
        if ($this->conn == null) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        $sql = "UPDATE images SET title = ?, description = ?, path = ?, owner_id = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $title = $this->getTitle();
        $description = $this->getDescription();
        $path = $this->getPath();
        $owner_id = $this->getOwnerId();
        $id = $this->getId();
        $stmt->bind_param("sssii", $title, $description, $path, $owner_id, $id);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function delete()
    {
        self::connectDatabase();
        if (self::$conn == null) {
            die("Connection failed: " . self::$conn->connect_error);
        }
        $sql = "DELETE FROM images WHERE id = ?";
        $stmt = self::$conn->prepare($sql);
        $id = $this->getId();
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Record deleted successfully"]);
            http_response_code(200);
        } else {
            echo json_encode(["message" => "Error deleting record"]);
            http_response_code(500);
        }
    }

    public function readAll()
    {
        self::connectDatabase();
        if (self::$conn == null) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        $sql = "SELECT * FROM images";
        $result = self::$conn->query($sql);
        if ($result->num_rows > 0) {
            echo json_encode(["data" => $result->fetch_all(MYSQLI_ASSOC), "message" => "Records fetched successfully"]);
            http_response_code(200);
        } else {
            echo json_encode(["message" => "No records found"]);
            http_response_code(404);
        }
    }
}


?>