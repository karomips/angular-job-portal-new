<?php
$host = 'localhost';  // Database host
$dbname = 'employee_database';  // Database name
$username = 'root';  // MySQL username
$password = '';  // MySQL password (if any)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
