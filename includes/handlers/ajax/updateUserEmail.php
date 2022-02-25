<?php 
    include ("../../config.php");

    if (!isset($_POST['username'])) {
        echo "ERROR: Could not set username";
        exit();
    }

    if (isset($_POST['email']) && $_POST['email'] != "") {
        $userEmail = $_POST['email'];
        $username = $_POST['username'];

        //Validating the email
        if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
            echo "Email is invalid";
            exit();
        }

        $checkEmail = mysqli_query($con, "SELECT email FROM users WHERE email='$userEmail' AND username != '$username'");
        if (mysqli_num_rows($checkEmail) > 0) {
            echo "Email is already in use";
            exit();
        }

        $updateQuery = mysqli_query($con, "UPDATE users SET email='$userEmail' WHERE username='$username'");
        echo "Update Successful";
        if (!$updateQuery) {
            die("Query Failed " . mysqli_error($con));
        }

    } else {
        echo "You must provide an email!";
    }
?>