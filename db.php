<?php
$host = 'localhost';
$user = 'root';
$pass = ''; // Default XAMPP/WAMP password is empty
$dbname = 'rudys_garden';

// Create connection
$conn = new mysqli($host, $user, $pass);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Select database if it exists
if ($conn->select_db($dbname) === false) {
    // It's okay if it fails here before setup_db.php is run.
    // We just won't be able to query tables.
}
?>
