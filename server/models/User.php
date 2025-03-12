<?php
require_once(__DIR__ . "/User.Skeleton.php");
class User extends User_Skeleton
{

    public static $conn;

    public static function connectDatabase()
    {
        if (self::$conn == null) {
            self::$conn = new mysqli("localhost", "root", "", "gallery");

        }
        if (self::$conn->connect_error) {
            die("Connection failed: " . self::$conn->connect_error);
        }

        return self::$conn;
    }
    public function __construct()
    {

    }
    public function createUser()
    {
        $conn = self::connectDatabase();
        $password = $this->getPassword();
        $password = password_hash($password, PASSWORD_BCRYPT);
        $name = $this->getName();
        $email = $this->getEmail();


        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(array("message" => "User created successfully"));
            http_response_code(201);
        } else {
            echo json_encode(array("message" => "User not created"));
            http_response_code(400);
        }
    }

    public function login()
    {
        $conn = self::connectDatabase();
        $email = $this->getEmail();
        $password = $this->getPassword();

        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                echo json_encode(array("message" => "Login successful"));
                http_response_code(200);
            } else {
                echo json_encode(array("message" => "Invalid password"));
                http_response_code(400);
            }
        } else {
            echo json_encode(array("message" => "User not found"));
            http_response_code(404);
        }
    }



}


?>