<?php 
	include "includes/config.php";
	include("includes/classes/User.php");
	include("includes/classes/Artist.php");
	include("includes/classes/Album.php");
	include("includes/classes/Song.php");
	include("includes/classes/Playlist.php");

	//session_destroy();

	if (isset($_SESSION['userLoggedIn'])) {
		$userLoggedIn = new User($con, $_SESSION['userLoggedIn']);
		$username = $userLoggedIn->getUsername();
		echo "<script>userLoggedIn = '$username'</script>";
	} else {
		header("Location: register.php");
	}
?>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Welcome to Spotify</title>

		<link rel="stylesheet" type="text/css" href="assets/css/style.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script src="assets/js/script.js"></script>
	</head>
	<body>
		<!-- <script>
			var audioElement = new Audio();
			audioElement.setTrack("assets/music/bensound-acousticbreeze.mp3");
			audioElement.audio.play();

		</script> -->

		<div id="mainContainer"> 
            <div class="topContainer">
                <?php include("includes/navBarContainer.php"); ?>
                <div id="mainViewContainer">
                    <div id="mainContent">
                       