<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (!isset($_POST['email']) || !isset($_POST['password'])) {
    die("Email or password not provided.");
  }

  $email = $_POST['email'];
  $password = $_POST['password'];

  $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
  if (!$stmt) {
    die("Prepare failed: " . $conn->error);
  }

  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows === 1) {
    $stmt->bind_result($id, $username, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $id;
      $_SESSION['username'] = $username;
      header("Location: welcome.php");
      exit;
    } else {
      echo "Invalid password.";
    }
  } else {
    echo "No account found with that email.";
  }

  $stmt->close();
  $conn->close();
}
?>
