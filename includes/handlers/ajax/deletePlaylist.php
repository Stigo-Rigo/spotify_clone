<?php 
    include ("../../config.php");

    if (isset($_POST['playlistId'])) {
        $playlistId = $_POST['playlistId'];

        $playlistQuery = mysqli_query($con, "DELETE FROM playlists WHERE id='$playlistId'");
        $playlistSongs = mysqli_query($con, "DELETE FROM playlistSongs WHERE playlistId='$playlistId'");
    } else {
        echo "PlaylistId was not passed into delete.php";
    }
?>