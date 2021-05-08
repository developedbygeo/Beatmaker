class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./allSounds/Drums/kick-classic.wav";
    this.currentSnare = "./allSounds/Drums/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/Drums/hihat-acoustic01.wav";
    this.currentClap = "./allSounds/Drums/clap-tape.wav";
    this.currentTom = "./allSounds/Drums/tom-acoustic01.wav";
    this.currentShaker = "./allSounds/Drums/shaker-analog.wav";
    this.currentPerc = "./allSounds/Drums/perc-short.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.shakerAudio = document.querySelector(".shaker-sound");
    this.percAudio = document.querySelector(".perc-sound");
    this.index = 0;
    this.bpm = 100;
    this.isPlaying = null;
    this.select = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempo = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    //   Looping over the index with the modulus
    let step = this.index % 10;
    const activeBox = document.querySelectorAll(`.b${step}`);
    //  Pad loop
    activeBox.forEach((box) => {
      // Defining the itiration count for ease-in-out to 2, to easy both in and out
      box.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //   Checking which pad is active
      if (box.classList.contains("active")) {
        //   Checking the class of each
        if (box.classList.contains("kick-pad")) {
          // Restarting the audio's current time for consecutive boxes
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (box.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (box.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (box.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (box.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
        if (box.classList.contains("shaker-pad")) {
          this.shakerAudio.currentTime = 0;
          this.shakerAudio.play();
        }
        if (box.classList.contains("perc-pad")) {
          this.percAudio.currentTime = 0;
          this.percAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    // Converting selected bpm to interval ms
    const interval = (60 / this.bpm) * 1000;
    // Checking for duplicate executions of start
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      //   if this.isPlaying is active, clear it
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
      this.playBtn.style.color = "#9f281d";

      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = `<i class="fas fa-play"></i>`;
      this.playBtn.style.color = "#129b39";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
      case "tom-select":
        this.tomAudio.src = selectionValue;
        break;
      case "shaker-select":
        this.shakerAudio.src = selectionValue;
        break;
      case "perc-select":
        this.percAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteFunc = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      e.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      e.target.style.color = "#9f281d";

      switch (muteFunc) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "4":
          this.tomAudio.volume = 0;
          break;
        case "5":
          this.shakerAudio.volume = 0;
          break;
        case "6":
          this.percAudio.volume = 0;
          break;
      }
    } else {
      e.target.innerHTML = `<i class="fas fa-music"></i>`;
      e.target.style.color = "#129b39";
      switch (muteFunc) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "4":
          this.tomAudio.volume = 1;
          break;
        case "5":
          this.shakerAudio.volume = 1;
          break;
        case "6":
          this.percAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoTxt = document.querySelector(".tempo-nr");
    tempoTxt.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drums = new DrumKit();

// Events

drums.pads.forEach((pad) => {
  pad.addEventListener("click", drums.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drums.playBtn.addEventListener("click", function () {
  drums.updateBtn();
  drums.start();
});

drums.select.forEach((select) => {
  select.addEventListener("change", function (e) {
    drums.changeSound(e);
  });
});
drums.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drums.mute(e);
  });
});

drums.tempo.addEventListener("input", function (e) {
  drums.changeTempo(e);
});

drums.tempo.addEventListener("change", function (e) {
  drums.updateTempo(e);
});
