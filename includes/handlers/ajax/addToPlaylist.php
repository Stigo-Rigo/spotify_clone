<?php 
    include("../../config.php");

    if (isset($_POST['playlistId']) && isset($_POST['songId'])) {
        $playlistId = intval($_POST['playlistId']);
        $songId = intval($_POST['songId']);

        $orderIdQuery = mysqli_query($con, "SELECT MAX(playlistOrder) + 1 as playlistOrder FROM playlistSongs WHERE playlistId='$playlistId'");
        $row = mysqli_fetch_array($orderIdQuery);
        $order = intval($row['playlistOrder']);

        $query = mysqli_query($con, "INSERT INTO playlistSongs (songId, playlistId, playlistOrder) VALUES('$songId', '$playlistId', '$order')");

        if (!$query) {
            die("QUERY FAILED " . mysqli_error($con) . " " . mysqli_errno($con));
        }

    } else {
        echo "SongId was not passed into addToPlaylist.php";
    }
?>