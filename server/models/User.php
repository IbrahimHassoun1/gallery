<?php
use \Firebase\JWT\JWT;
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
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            echo json_encode(array("message" => "Email already exists"));
            http_response_code(400);
            return;
        }

        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
        $result = $conn->query($sql);
        if ($result) {


            http_response_code(201);
            $this->login();
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
            $id = $row['id'];
            if (password_verify($password, $row['password'])) {
                require_once(__DIR__ . '/../JWT/JWT.php');

                $key = "Example";
                $payload = array(
                    "exp" => time() + (60 * 60),
                    "data" => array(
                        "id" => $row['id'],
                        "name" => $row['name'],
                        "email" => $row['email']
                    )
                );

                $jwt = JWT::encode($payload, $key, 'HS256');

                echo json_encode(array("message" => "Login successful", "token" => $jwt, "id" => $id));
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