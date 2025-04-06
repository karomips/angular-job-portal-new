<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email'])) {
    $email = $data['email'];

    try {
        // Delete employee
        $stmt = $pdo->prepare("DELETE FROM employees WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Employee deleted successfully']);
        } else {
            echo json_encode(['message' => 'Employee not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error deleting employee', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid data']);
}
?>
