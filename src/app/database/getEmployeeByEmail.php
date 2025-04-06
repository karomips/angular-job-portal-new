<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email'])) {
    $email = $data['email'];

    try {
        // Get employee by email
        $stmt = $pdo->prepare("SELECT * FROM employees WHERE email = ?");
        $stmt->execute([$email]);
        $employee = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($employee) {
            echo json_encode($employee);
        } else {
            echo json_encode(['message' => 'Employee not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error fetching employee', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid data']);
}
?>
