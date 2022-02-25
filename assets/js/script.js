var currentPlaylist = [];
var shuffledPlaylist = [];
var audioElement;
var mouseDown = false;
var currentIndex = 0;
var repeatSong = false;
var shuffle = false;
var userLoggedIn;
var timer;

//If we click out, hide the option menu
$(document).click(function(click) {
  var target = $(click.target);

  //If the thing we clicked on doesn't have the class 'item' and the class 'optionsMenu'
  if (!target.hasClass("item") && !target.hasClass("optionsButton")) {
    hideOptionsMenu();
  }
})

//If the window is scrolled, hide the option menu...
$(window).scroll(function() {
  hideOptionsMenu();
})

//When the select is changed, add song to a playlist
$(document).on("change", "select.playlist", function() { 
  var select = $(this);
  var playlistId = select.val();
  var songId = select.prev(".songId").val();

  $.post("includes/handlers/ajax/addToPlaylist.php", { playlistId: playlistId, songId: songId}).done(function(error) {
    if(error != "") {
      alert(error);
      return;
    }
    
    hideOptionsMenu();
    select.val("");
  })
})

//logout
function logout() {
  $.post("includes/handlers/ajax/logout.php", function() {
    location.reload();
  })
}

//seamless page transition with ajax
function openPage(url) {
  if (timer != null) {
    clearTimeout(timer);
  }

  // If the url doesn't contain a '?'
  if (url.indexOf("?") == -1) {
    url = url + "?";
    //return; 
  }

  var encodedUrl = encodeURI(url + "&userLoggedIn=" + userLoggedIn);
  $("#mainContent").load(encodedUrl);
  $(".body").scrollTop(0);
  history.pushState(null, null, url);
}

//updating the user email 
function updateUserEmail(emailClass) {
  var emailValue = $("." + emailClass).val();

  $.post("includes/handlers/ajax/updateUserEmail.php", {email: emailValue, username: userLoggedIn})
  .done(function(response) {
    $("." + emailClass).nextAll(".message").text(response);

  })
}

//updating the user password
function updateUserPassword(oldPasswordClass, newPasswordClass1, newPasswordClass2) {
  var oldPassword = $("." + oldPasswordClass).val();
  var newPassword1 = $("." + newPasswordClass1).val();
  var newPassword2 = $("." + newPasswordClass2).val();

  $.post("includes/handlers/ajax/updateUserPassword.php", {oldPassword: oldPassword,
    newPassword1: newPassword1,
    newPassword2: newPassword2,
    username: userLoggedIn})
  .done(function(response) {
    $("." + oldPasswordClass).nextAll(".message").text(response);
  })
}

function createPlaylist() {
  var popup = prompt("Please enter the name of your playlist");

  if (popup != null) {
    //Do an ajax call to retrieve from playlist table
    $.post("includes/handlers/ajax/createPlaylist.php", {name: popup, username: userLoggedIn}).done(function(error) {
      if (error != "") {
        alert(error);
        return;
      }

      //do something when ajax returns
      openPage("yourMusic.php");
    })
  }
}

//deleting from songs from a playlist
function removeFromPlaylist(button, playlistId) {
  var songId = $(button).prevAll(".songId").val();

  $.post("includes/handlers/ajax/removeFromPlaylist.php", {playlistId: playlistId, songId: songId})
  .done(function(error) {
    if (error != "") {
      alert(error);
      return;
    }

    //do something when ajax returns
    openPage("playlist.php?id=" + playlistId);
  })
}

function deletePlaylist(playlistId) {
  var prompt = confirm("Are you sure you want to delete this playlist?");

  if (prompt) {
    //Do an ajax call to delete a playlist
    $.post("includes/handlers/ajax/deletePlaylist.php", {playlistId: playlistId}).done(function(error) {
      if (error != "") {
        alert(error);
        return;
      }

      //do something when ajax returns
      openPage("yourMusic.php");
    })
  }
}

function hideOptionsMenu() {
  var menu = $(".optionsMenu");
  if (menu.css("display") != "none") {
    menu.css("display", "none");
  }
}

function showOptionsMenu(button) {
  var songId = $(button).prevAll(".songId").val();
  var menu = $(".optionsMenu");
  var menuWidth = menu.width();
  menu.find(".songId").val(songId);

  var scrollTop = $(window).scrollTop(); //Distance from top of window to top of document
  var elementOffset = $(button).offset().top; //distance from top of document
  
  var top = elementOffset - scrollTop;
  var left = $(button).position().left;

  menu.css({ "top": top + "px", "left": left - menuWidth + "px", "display": "inline"});
}

function formatTime(seconds) {
  var time = Math.round(seconds)
  var minutes = Math.floor(time / 60)
  var seconds = time - minutes * 60

  var extraZero = seconds < 10 ? "0" : ""

  return minutes + ":" + extraZero + seconds
}

//Updating the time progress bar
function updateTimeProgressBar(audio) {
  $(".progressTime.current").text(formatTime(audio.currentTime))
  $(".progressTime.remaining").text(formatTime(audio.duration - audio.currentTime))

  //updating the progress bar using the percentage of the total time of a song
  var progress = (audio.currentTime / audio.duration) * 100
  $(".playbackBar .progress").css("width", progress + "%")
}

//Updating the volume progress bar
function updateVolumeProgressBar(audio) {
    var volume = audio.volume * 100;
    $(".volumeBar .progress").css("width", volume + "%")
}

//The play button for the artist page
function playFirstSong() {
  setTrack(tempPlaylist[0], tempPlaylist, true);
}

function Audio() {
  this.currentlyPlaying
  this.audio = document.createElement("audio")

  this.audio.addEventListener("ended", function() {
    nextSong()
  })

  this.audio.addEventListener("canplay", function () {
    //'this' refers to the object that the event was called on
    var duration = formatTime(this.duration)
    $(".progressTime.remaining").text(duration)
  })

  this.audio.addEventListener("timeupdate", function () {
    if (this.duration) {
      updateTimeProgressBar(this)
    }
  })

  this.audio.addEventListener("volumechange", function() {
    updateVolumeProgressBar(this);
  })

  this.setTrack = (track) => {
    this.currentlyPlaying = track
    this.audio.src = track.path
  }

  this.play = () => {
    this.audio.play()
  }

  this.pause = () => {
    this.audio.pause()
  }

  this.setTime = (seconds) => {
    this.audio.currentTime = seconds
  }
}
