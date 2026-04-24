<?php
session_start();
require_once '../db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all portfolio items
    $result = $conn->query("SELECT * FROM portfolio_items ORDER BY created_at DESC");
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $items]);
} 
elseif ($method === 'POST') {
    // Add new portfolio item (requires auth)
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }

    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';
    $image_url = $_POST['image_url'] ?? '';

    if (empty($title) || empty($category) || empty($image_url)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO portfolio_items (title, category, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $category, $image_url);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Portfolio item added.', 'id' => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to add item: ' . $stmt->error]);
    }
}
elseif ($method === 'DELETE') {
    // Delete a portfolio item (requires auth)
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }

    // Get DELETE data (since PHP doesn't populate $_POST on DELETE method)
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'] ?? null;

    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID is required.']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM portfolio_items WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Portfolio item deleted.']);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Item not found.']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete item: ' . $stmt->error]);
    }
}
else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>
