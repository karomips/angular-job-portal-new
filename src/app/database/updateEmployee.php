<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email'], $data['updatedData'])) {
    $email = $data['email'];
    $updatedData = $data['updatedData'];

    try {
        // Fetch the employee by email
        $stmt = $pdo->prepare("SELECT * FROM employees WHERE email = ?");
        $stmt->execute([$email]);
        $employee = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($employee) {
            // Update the employee
            $sql = "UPDATE employees SET name = :name, isManager = :isManager WHERE email = :email";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $updatedData['name'] ?? $employee['name'],
                ':isManager' => $updatedData['isManager'] ?? $employee['isManager'],
                ':email' => $email
            ]);

            echo json_encode(['message' => 'Employee updated successfully']);
        } else {
            echo json_encode(['message' => 'Employee not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error updating employee', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid data']);
}
?>
