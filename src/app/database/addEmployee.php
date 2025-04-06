<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

function generateEmployeeId($name) {
    $randomNum = rand(1, 10);
    return strtoupper(substr($name, 0, 3)) . '0' . $randomNum;
}

if (isset($data['name'], $data['email'], $data['isManager'])) {
    $name = $data['name'];
    $email = $data['email'];
    $isManager = $data['isManager'];

    // Generate employee ID
    $id = generateEmployeeId($name);

    try {
        // Check if email exists
        $stmt = $pdo->prepare("SELECT * FROM employees WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Email already exists']);
            exit;
        }

        // Insert employee
        $stmt = $pdo->prepare("INSERT INTO employees (name, email, isManager) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $isManager]);

        echo json_encode(['message' => 'Employee added successfully!', 'employeeId' => $id]);

    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error adding employee', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid data']);
}
?>
