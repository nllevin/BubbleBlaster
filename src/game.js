import Level from "./level";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    this.images = {};
    this.loadImages([
      "background", 
      "players", 
      "mirrorPlayers", 
      "items", 
      "bubbles",
      "spikes",
      "wall"
    ]);
    this.play = this.play.bind(this);
    this.createButtons();
  }

  createButtons() {
    document.getElementById("play").addEventListener("click", () => {
      document.getElementById("start-buttons").style.display = "none";
      this.startGame()
    });

    const playAgain = document.getElementById("play-again");
    playAgain.addEventListener("click", () => {
      playAgain.style.display = "none";
      this.startGame()
    });

    document.getElementById("instructions-button").addEventListener("click", () => {
      document.getElementById("instructions").style.display = "block";
    });

    document.getElementById("close-instructions").addEventListener("click", () => {
      document.getElementById("instructions").style.display = "none";
    });
  }

  drawBrickWall() {
    const wall = this.ctx.createPattern(this.images.wall, "repeat");
    this.ctx.fillStyle = wall;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawInfo() {
    this.drawBrickWall();
    this.drawTimeInfo();
    this.drawLivesInfo();
    this.drawLevelInfo();
    this.drawScoreInfo();
  }

  drawLevelInfo() {
    const displayHeight = 439;
    this.ctx.fillStyle = "rgb(220, 227, 229)";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(this.ctx.canvas.width / 2 - 50, displayHeight);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 50, displayHeight);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 50, displayHeight + 30);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 25, displayHeight + 30);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 25, displayHeight + 55);
    this.ctx.lineTo(this.ctx.canvas.width / 2 - 25, displayHeight + 55);
    this.ctx.lineTo(this.ctx.canvas.width / 2 - 25, displayHeight + 30);
    this.ctx.lineTo(this.ctx.canvas.width / 2 - 50, displayHeight + 30);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.lineWidth = 2;
    this.ctx.font = "18px 'Press Start 2P'";
    this.ctx.strokeText("LEVEL", this.ctx.canvas.width / 2 - 44, displayHeight + 25);
    this.ctx.strokeText("1", this.ctx.canvas.width / 2 - 9, displayHeight + 50);
  }

  drawLivesInfo() {
    const height = 435;
    const x_start = 93;
    this.ctx.fillStyle = "rgb(220, 227, 229)";
    
    for (let i = 0; i < 9; i++) {
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 3;
      this.ctx.fillRect(x_start + i * 30, height, 30, 30);
      this.ctx.strokeRect(x_start + i * 30, height, 30, 30);
      if (i < this.lives) {
        this.ctx.drawImage(
          this.images.players,
          154, 44,
          16, 16,
          x_start + 3 + i * 30, height + 3,
          24, 24
        );
      } else {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.font = "18px 'Press Start 2P'";
        this.ctx.strokeText("x", x_start + 7 + i * 30, height + 23);
      }
    }
  }

  drawScoreInfo() {
    const x_start = 93;
    const height = 471;
    this.ctx.lineWidth = 3;
    this.ctx.font = "18px 'Press Start 2P'";
    this.ctx.fillStyle = "rgb(220, 227, 229)";
    this.ctx.strokeStyle = "black";
    this.ctx.fillRect(x_start, height, 230, 30);
    this.ctx.strokeRect(x_start, height, 230, 30);

    this.ctx.fillStyle = "black";
    this.ctx.fillText(`SCORE: ${" ".repeat(5 - String(this.score).length)}${this.score}`, x_start + 8, height + 25);
  }

  drawTimeInfo() {
    const height = 420;
    const x_start = 93;
    this.ctx.fillStyle = "gray";
    this.ctx.strokeStyle = "rgb(169, 169, 169)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(x_start, height, 715, 8);
    this.ctx.fillRect(x_start, height, 715, 8);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x_start, height, 715 * this.level.time / (this.level.startTime * 60), 8);
  }

  gameOver() {
    this.drawInfo();

    this.ctx.fillStyle = "red";
    this.ctx.font = "48px 'Press Start 2P'";
    this.ctx.lineWidth = 3;
    this.ctx.fillText("GAME OVER", this.ctx.canvas.width / 2 - 9 * 48 / 2, 120);
    this.ctx.fillText("FINAL SCORE:", this.ctx.canvas.width / 2 - 11 * 48 / 2, 236);
    this.ctx.fillText(this.score, this.ctx.canvas.width / 2 - String(this.score).length * 48 / 2, 297);

    const playAgain = document.getElementById("play-again");
    playAgain.style.display = "block";
  }

  loadImages(imageNames) {
    imageNames.forEach(imageName => {
      const image = new Image();
      
      image.onload = () => {
        this.images[imageName] = image;
        if (Object.keys(this.images).length === imageNames.length) {
          this.showMainMenu();
        }
      };

      image.src = `./assets/${imageName}.png`;
    });
  }

  play() {    
    const animationRequest = window.requestAnimationFrame(this.play);

    this.score = this.score + this.level.frameScore;
    this.drawInfo();
    
    if (!this.level.isStarted) {
      this.level.start();
    } else if (!this.level.over()) {
      this.level.step();
    } else if (this.level.lost) {
      if (this.level.lossSequenceFrame <= 150) {
        this.level.lossSequenceFrame = this.level.lossSequenceFrame + 1;
        this.level.step()
        if (this.level.outOfTime) {
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 2;
          this.ctx.font = "24px 'Press Start 2P'";
          this.ctx.strokeText("OUT OF TIME", this.ctx.canvas.width / 2 - 11 * 24 / 2, 100);
        }
      } else {
        this.lives = this.lives - 1;
        if (this.lives > 0) {
          this.level = new Level(this.ctx, this.images);
        } else {
          window.cancelAnimationFrame(animationRequest);
          this.gameOver();
        }
      }
    } else if (this.level.won) {
      this.level.frameScore = 0;
      this.level.animate();
      if (this.level.time - 10 >= 0) {
        this.level.time = this.level.time - 10;
        this.score = this.score + 5;
      } else {
        this.level = new Level(this.ctx, this.images);
      }
    }
  }

  showMainMenu() {
    this.drawBrickWall();
    this.ctx.drawImage(this.images.bubbles, 1, 5, 48, 45, this.ctx.canvas.width / 2 - 50, this.ctx.canvas.height / 12, 100, 100);
    this.ctx.drawImage(this.images.bubbles, 1, 55, 48, 45, this.ctx.canvas.width / 3, this.ctx.canvas.height / 12 + 25, 50, 50);
    this.ctx.drawImage(this.images.bubbles, 1, 55, 48, 45, this.ctx.canvas.width * 2 / 3 - 50, this.ctx.canvas.height / 12 + 25, 50, 50);
    this.ctx.drawImage(this.images.bubbles, 1, 103, 48, 45, this.ctx.canvas.width / 4 + 12.5, this.ctx.canvas.height / 12 + 37.5, 25, 25);
    this.ctx.drawImage(this.images.bubbles, 1, 103, 48, 45, this.ctx.canvas.width * 3 / 4 - 37.5, this.ctx.canvas.height / 12 + 37.5, 25, 25);
    this.ctx.drawImage(this.images.bubbles, 1, 5, 48, 45, this.ctx.canvas.width / 2 - 50, this.ctx.canvas.height * 7 / 10, 100, 100);
    this.ctx.drawImage(this.images.bubbles, 1, 55, 48, 45, this.ctx.canvas.width / 3, this.ctx.canvas.height * 7 / 10 + 25, 50, 50);
    this.ctx.drawImage(this.images.bubbles, 1, 55, 48, 45, this.ctx.canvas.width * 2 / 3 - 50, this.ctx.canvas.height * 7 / 10 + 25, 50, 50);
    this.ctx.drawImage(this.images.bubbles, 1, 103, 48, 45, this.ctx.canvas.width / 4 + 12.5, this.ctx.canvas.height * 7 / 10 + 37.5, 25, 25);
    this.ctx.drawImage(this.images.bubbles, 1, 103, 48, 45, this.ctx.canvas.width * 3 / 4 - 37.5, this.ctx.canvas.height * 7 / 10 + 37.5, 25, 25);
  }

  startGame() {
    this.lives = 5;
    this.score = 0;
    this.level = new Level(this.ctx, this.images);
    this.play();
  }
}