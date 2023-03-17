const PLAY_STATUC = { PLAY: 1, PAUSE: 0 };
export const Video2Canvas = class Video2Canvas {
  constructor(video, canvas) {
    this.statuc = PLAY_STATUC.PAUSE;
    this.video = video;
    if (!(this.canvas = canvas)) {
      this.canvas = document.createElement("canvas");
      (this.canvas.width = video.videoWidth),
        (this.canvas.height = video.videoHeight),
        (this.canvas.className = video.className);
      video.style.display = "none";
      video.parentNode.appendChild(this.canvas);
    }
    this.c2d = this.canvas.getContext("2d");
    this.video.addEventListener("play", this.play.bind(this));
    this.video.addEventListener("pause", this.pause.bind(this));
  }

  render() {
    if (this.statuc === PLAY_STATUC.PLAY) {
      this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.c2d.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      requestAnimationFrame(this.render.bind(this));
    }
  }

  play() {
    console.log("播放");
    if (this.video.paused) this.video.play();
    this.statuc = PLAY_STATUC.PLAY;
    this.render();
    return this;
  }

  pause() {
    console.log("暂停");
    if (this.video.played) this.video.pause();
    this.statuc = PLAY_STATUC.PAUSE;
    return this;
  }
};
