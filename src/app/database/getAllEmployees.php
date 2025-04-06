<?php
include 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM employees");
    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($employees);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error fetching employees', 'error' => $e->getMessage()]);
}
?>
