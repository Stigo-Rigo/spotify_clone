<?php 
    include("../../config.php");

    if (isset($_POST['playlistId']) && isset($_POST['songId'])) {
        $playlistId = intval($_POST['playlistId']);
        $songId = intval($_POST['songId']);

        $query = mysqli_query($con, "DELETE FROM playlistSongs WHERE playlistId='$playlistId' AND songId='$songId'");

        if (!$query) {
            die("Query Failed! " . mysqli_error($con) . mysqli_errno($con));
        }

    } else {
        echo "PlaylistId or songId was not passed into removeFromPlaylist.php";
    }
?>