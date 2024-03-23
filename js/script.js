//Initialize the variables

let timeDuration = 0;
let songIndex = 0;
let audioElement = new Audio("Songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Bad Idea - Ariana Grande",
    filePath: "Songs/1.mp3",
    coverrPath: "Covers/1.jpg",
    timeStamp: "04:28",
  },
  {
    songName: "Calm Down - Selena-Gomez",
    filePath: "Songs/2.mp3",
    coverrPath: "Covers/2.jpg",
    timeStamp: "03:59",
  },
  {
    songName: "Cruel Summer - Taylor Swift",
    filePath: "Songs/3.mp3",
    coverrPath: "Covers/3.jpg",
    timeStamp: "02:59",
  },
  {
    songName: "Flowers - Taylor Swift",
    filePath: "Songs/4.mp3",
    coverrPath: "Covers/4.jpg",
    timeStamp: "03:20",
  },
  {
    songName: "Genesis - Dua Lipa",
    filePath: "Songs/5.mp3",
    coverrPath: "Covers/5.jpg",
    timeStamp: "03:25",
  },
  {
    songName: "Heroes Tonight -Janji",
    filePath: "Songs/6.mp3",
    coverrPath: "Covers/6.jpg",
    timeStamp: "03:28",
  },
  {
    songName: "Husn -  Anuv Jain",
    filePath: "Songs/7.mp3",
    coverrPath: "Covers/7.jpg",
    timeStamp: "03:37",
  },
  {
    songName: "Lover - Taylor Swift",
    filePath: "Songs/8.mp3",
    coverrPath: "Covers/8.jpg",
    timeStamp: "03:58",
  },
  {
    songName: "Save Your Tears - The Weeknd",
    filePath: "Songs/9.mp3",
    coverrPath: "Covers/9.jpg",
    timeStamp: "03:36",
  },
  {
    songName: "Starboy - The Weeknd",
    filePath: "Songs/10.mp3",
    coverrPath: "Covers/10.jpg",
    timeStamp: "02:59",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverrPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("timeStamp")[0].textContent =
    songs[i].timeStamp;
});

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element, i) => {
        if (songIndex == i) {
          element.classList.remove("fa-play-circle");
          element.classList.add("fa-pause-circle");
        }
      }
    );
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element, i) => {
        if (songIndex == i) {
          element.classList.remove("fa-pause-circle");
          element.classList.add("fa-play-circle");
        }
      }
    );
  }
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //Update Seekbar

  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  if (audioElement.currentTime == audioElement.duration) {
    songIndex < 9 ? (songIndex += 1) : (songIndex = 0);
    audioElement.play();
    makeAllPlays();
    masterSongName.innerText = songs[songIndex].songName;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element, i) => {
        if (songIndex == i) {
          element.classList.remove("fa-play-circle");
          element.classList.add("fa-pause-circle");
        }
      }
    );
  }

  timeDuration = audioElement.duration - audioElement.currentTime;
  document.getElementsByClassName("timeStamp")[songIndex].textContent = (
    Math.round((timeDuration / 60) * 100) / 100
  ).toFixed(2);
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );

  songItems.forEach((element, i) => {
    element.getElementsByClassName("timeStamp")[0].textContent =
      songs[i].timeStamp;
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (e.target.classList == "far songItemPlay fa-pause-circle") {
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        audioElement.pause();
        gif.style.opacity = 0;
      } else {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      if (songIndex == i) {
        makeAllPlays();
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
      }
    }
  );

  audioElement.src = `Songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      if (songIndex == i) {
        makeAllPlays();
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
      }
    }
  );

  audioElement.src = `Songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
