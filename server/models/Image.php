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

        if (!self::$conn instanceof mysqli) {
            echo json_encode(["message" => "Database connection error"]);
            http_response_code(500);
            return false;
        }

        $imageBase64 = $this->getImage();

        if (empty($imageBase64)) {
            echo json_encode(["message" => "No image uploaded"]);
            http_response_code(400);
            return false;
        }

        $targetDir = __DIR__ . "/../assets/";

        // Validate Base64 format
        if (!preg_match('/^data:image\/(\w+);base64,/', $imageBase64, $type)) {
            echo json_encode(["message" => "Invalid image format"]);
            http_response_code(400);
            return false;
        }

        $imageType = strtolower($type[1]); // Extract file extension
        $imageData = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $imageBase64));

        if ($imageData === false) {
            echo json_encode(["message" => "Failed to decode base64 image"]);
            http_response_code(400);
            return false;
        }

        // Generate unique filename
        $uniqueName = uniqid() . "." . $imageType;
        $targetFile = $targetDir . $uniqueName;

        // Ensure directory exists
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Save the image
        if (file_put_contents($targetFile, $imageData) === false) {
            echo json_encode(["message" => "Failed to save image"]);
            http_response_code(500);
            return false;
        }

        $this->setPath($uniqueName);

        // Insert into database
        $sql = "INSERT INTO images (title, description, path, owner_id) VALUES (?, ?, ?, ?)";
        $stmt = self::$conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["message" => "SQL error: " . self::$conn->error]);
            http_response_code(500);
            return false;
        }

        $title = $this->getTitle();
        $description = $this->getDescription();
        $path = $this->getPath();
        $owner_id = $this->getOwnerId();

        $stmt->bind_param("sssi", $title, $description, $path, $owner_id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Image uploaded successfully", "file" => $uniqueName]);
            return true;
        } else {
            echo json_encode(["message" => "Database insert failed"]);
            http_response_code(500);
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
        if (self::$conn == null) {
            die("Connection failed: " . self::$conn->connect_error);
        }


        $sql = "UPDATE images SET title = ?, description = ? WHERE id = ?";
        $stmt = self::$conn->prepare($sql);
        $title = $this->getTitle();
        $description = $this->getDescription();


        $id = $this->getId();
        $stmt->bind_param("ssi", $title, $description, $id);
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