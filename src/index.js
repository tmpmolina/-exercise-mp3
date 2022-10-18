let soundplaying;
let soundPlayingInfo;

let sonidosJson = await fetch("./sonidos.JSON");
sonidosJson = await sonidosJson.json();

const songsList = document.getElementsByClassName("song-in-music-list");
const lastButton = document.getElementsByClassName("last-button");
const playStopButton = document.getElementsByClassName("play-button");
const nextButton = document.getElementsByClassName("next-button");
const playStopButtonImg = document.getElementsByClassName("play-button-img");
const artBox = document.querySelector(".art-box img");
const titleh1 = document.querySelector(".title h1");
const titleh2 = document.querySelector(".title h2");
const volumeBar = document.querySelector(".volume-bar");
const volumeBarStyle = document.querySelector(".volume-bar-style");
const currentTimeBar = document.querySelector(".current-time-bar");

// function clearMusicList() {
//   const songsList = document.getElementsByClassName("song-in-music-list");
//   if (songsList.length > 0) {
//     console.log(songsList.length - 1);
//     // songsList[0].removeEventListener("click", clearMusicList);
//     songsList[0].remove();
//     clearMusicList();
//   }
// };

function playPausedButtonSwitch() {
  if (!soundplaying.paused) {
    playStopButtonImg[0].src = "./img/img-pause.png";
  } else {
    playStopButtonImg[0].src = "./img/img-play.png";
  }
}

function clearCurrentSongClass() {
  const currentSongClass = document.getElementsByClassName("current-song");
  if (currentSongClass.length > 0) {
    currentSongClass[0].classList.remove("current-song");
    clearCurrentSongClass();
  }
}

const addNewSong = function(soundnew, div = false) {
  clearCurrentSongClass();
  if (div) {
    div.classList.add("current-song");
  }
  const soundInfo = soundnew;
  titleh1.textContent = soundInfo.artist;
  titleh2.textContent = soundInfo.title;
  soundnew = new Audio(soundnew.path);
  if (soundplaying !== undefined) {
    soundplaying.pause();
    soundPlayingInfo = soundInfo;
    artBox.src = soundInfo.image;
    soundplaying = soundnew;
    soundplaying.play();
  } else {
    soundPlayingInfo = soundInfo;
    artBox.src = soundInfo.image;
    soundplaying = soundnew;
    soundplaying.play();
  }
  playPausedButtonSwitch();
};

function lastButtonFunction() {
  if (soundplaying === undefined) {
    addNewSong(sonidosJson[sonidosJson.length - 1], songsList[sonidosJson.length - 1]);
    return;
  } else {
    console.log(soundplaying.currentTime);
    if (soundplaying.currentTime > 5) {
      soundplaying.load();
      soundplaying.play();
      return;
    }
  }

  for (const i in sonidosJson) {
    if (sonidosJson[i].path === soundPlayingInfo.path) {
      if (parseInt(i) === 0) {
        addNewSong(sonidosJson[sonidosJson.length - 1], songsList[sonidosJson.length - 1]);
      } else {
        addNewSong(sonidosJson[parseInt(i) - 1], songsList[parseInt(i) - 1]);
      }
      break;
    }
  }
}

function playStopButtonFunction() {
  if (soundplaying !== undefined) {
    if (!soundplaying.paused) {
      soundplaying.pause();
    } else {
      soundplaying.play();
    }
    playPausedButtonSwitch();
  }
}

function nextButtonFunction() {
  const songsList = document.getElementsByClassName("song-in-music-list");
  if (soundplaying === undefined) {
    addNewSong(sonidosJson[0], songsList[0]);
    return;
  }
  for (const i in sonidosJson) {
    if (sonidosJson[i].path === soundPlayingInfo.path) {
      if (sonidosJson.length === parseInt(i) + 1) {
        addNewSong(sonidosJson[0], songsList[0]);
      } else {
        addNewSong(sonidosJson[parseInt(i) + 1], songsList[parseInt(i) + 1]);
      }
      break;
    }
  }
}

let volumeBarValueSave = volumeBar.value;
function valumeManipulation(event) {
  if (volumeBarValueSave === volumeBar.value) {
    return;
  }
  volumeBarStyle.style.background = "linear-gradient(to right, yellow " + volumeBar.value + "%, transparent " + volumeBar.value + "%)";
  if (soundplaying === undefined) {
    return;
  }
  volumeBarValueSave = volumeBar.value;
  console.log(event.clientY);
  soundplaying.volume = volumeBar.value / 100;
}

function timeManipulation(event) { // ME HE QUEDADO TRABAJANDO AQUIIII
  // volumeBarStyle.style.background = "linear-gradient(to right, yellow " + volumeBar.value + "%, transparent " + volumeBar.value + "%)";
  if (soundplaying === undefined) {
    return;
  }
  soundplaying.currentTime = currentTimeBar.value;
  if (currentTimeBar.value === soundplaying.currentTime) {
    return;
  }
  currentTimeBar.max = soundplaying.duration;
  soundplaying.currentTime = currentTimeBar.value;
}

function loadMusicList() {
  for (const i in sonidosJson) {
    const musicList = document.querySelector(".music-list");
    const div = document.createElement("div");
    const b = document.createElement("b");
    div.appendChild(b);
    div.classList.add("song-in-music-list");
    b.textContent = `${parseInt(i) + 1}. ${sonidosJson[i].artist} - ${sonidosJson[i].title}`;
    div.addEventListener("click", addNewSong.bind(Event, sonidosJson[i], div));
    musicList.appendChild(div);
  }
}

loadMusicList();
// playStopButton[0].addEventListener("click", playSound.bind(Event, sonidosJson[2].path));

lastButton[0].addEventListener("click", lastButtonFunction);
playStopButton[0].addEventListener("click", playStopButtonFunction);
nextButton[0].addEventListener("click", nextButtonFunction);
volumeBar.addEventListener("mousemove", valumeManipulation);
currentTimeBar.addEventListener("mousemove", timeManipulation);
