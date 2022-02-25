<?php 
	function sanitizeFormUsername($input_text) {
		$input_text = strip_tags($input_text); 
		$input_text = str_replace(" ", "", $input_text);
		return $input_text;
	}

	function sanitizeFormString($input_text) {
		$input_text = strip_tags($input_text);
		$input_text = str_replace(" ", "", $input_text);
		$input_text = ucfirst(strtolower($input_text));
		return $input_text;
	}

	function sanitizeFormPassword($password) {
		$password = strip_tags($password);
		return $password;
	}


	if (isset($_POST['registerButton'])) {
		//If register button was pressed
		$username = sanitizeFormUsername($_POST['username']);
		$firstName = sanitizeFormString($_POST['firstName']);
		$lastName = sanitizeFormString($_POST['lastName']);
		$email = sanitizeFormString($_POST['email']);
		$email2 = sanitizeFormString($_POST['email2']);
		$password = sanitizeFormPassword($_POST['password']);
		$password2 = sanitizeFormPassword($_POST['password2']);

		$wasSuccessful = $account->register($username, $firstName, $lastName, $email, $email2, $password, $password2);
		if ($wasSuccessful) {
			$_SESSION['userLoggedIn'] = $username;
			header("Location: index.php");
		}
	}
?>
