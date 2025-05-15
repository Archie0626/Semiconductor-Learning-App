<?php
$servername = "localhost";
$username = "root";         // Default XAMPP username
$password = "";             // Default is empty
$dbname = "semilearn";      // Change to your DB name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
