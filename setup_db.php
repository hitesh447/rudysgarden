<?php
$host = 'localhost';
$user = 'root';
$pass = '';

// Create connection
$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS rudys_garden";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully.<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

$conn->select_db("rudys_garden");

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($conn->query($sql) === TRUE) {
    echo "Table 'users' created successfully.<br>";
} else {
    echo "Error creating table 'users': " . $conn->error . "<br>";
}

// Create portfolio_items table
$sql = "CREATE TABLE IF NOT EXISTS portfolio_items (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql) === TRUE) {
    echo "Table 'portfolio_items' created successfully.<br>";
} else {
    echo "Error creating table 'portfolio_items': " . $conn->error . "<br>";
}

// Insert default user if not exists
$username = 'admin';
$password = 'admin123';
$hashed = password_hash($password, PASSWORD_DEFAULT);
$check_user = $conn->query("SELECT id FROM users WHERE username='$username'");
if ($check_user->num_rows == 0) {
    $conn->query("INSERT INTO users (username, password_hash) VALUES ('$username', '$hashed')");
    echo "Default user 'admin' created.<br>";
}

// Insert original static portfolio items as initial seed
$check_portfolio = $conn->query("SELECT id FROM portfolio_items LIMIT 1");
if ($check_portfolio->num_rows == 0) {
    $items = [
        ['title' => 'Modern Garden Design', 'category' => 'Landscaping', 'image_url' => 'https://loremflickr.com/600/600/garden,modern/all'],
        ['title' => 'Outdoor Patio Retreat', 'category' => 'Hardscape', 'image_url' => 'https://loremflickr.com/600/600/patio,outdoor/all'],
        ['title' => 'Luxury Backyard Pool', 'category' => 'Pools', 'image_url' => 'https://loremflickr.com/600/600/backyard,pool/all'],
        ['title' => 'Front Yard Makeover', 'category' => 'Landscaping', 'image_url' => 'https://loremflickr.com/600/600/lawn,house/all'],
        ['title' => 'Custom Stone Pathway', 'category' => 'Hardscape', 'image_url' => 'https://loremflickr.com/600/600/pathway,stone/all'],
        ['title' => 'Seasonal Flower Beds', 'category' => 'Landscaping', 'image_url' => 'https://loremflickr.com/600/600/flowers,landscape/all'],
        ['title' => 'Premium Wood Decking', 'category' => 'Hardscape', 'image_url' => 'https://loremflickr.com/600/600/deck,wood/all'],
        ['title' => 'Tranquil Water Feature', 'category' => 'Landscaping', 'image_url' => 'https://loremflickr.com/600/600/water,feature,garden/all'],
        ['title' => 'Evening Pool Illumination', 'category' => 'Pools', 'image_url' => 'https://loremflickr.com/600/600/swimming,pool,night/all']
    ];

    $stmt = $conn->prepare("INSERT INTO portfolio_items (title, category, image_url) VALUES (?, ?, ?)");
    foreach ($items as $item) {
        $stmt->bind_param("sss", $item['title'], $item['category'], $item['image_url']);
        $stmt->execute();
    }
    echo "Default portfolio items inserted.<br>";
}

$conn->close();
echo "Setup complete. <a href='login.html'>Go to Login</a>";
?>
