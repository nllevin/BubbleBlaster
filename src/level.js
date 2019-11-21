import Player from "./player";
import Bubble from "./bubble";

const CONSTANTS = {
  BACKGROUND_WIDTH: 384,
  BACKGROUND_HEIGHT: 208,
  LEVEL_X: 76,
  LEVEL_Y: 5,
  LEVEL_WIDTH: 731 + 2 * 8,
  LEVEL_HEIGHT: 394 + 2 * 8,
};

export default class Level {
  constructor(canvas, images) {
    this.ctx = canvas;
    this.images = images;

    this.player = new Player(canvas);
    this.bubbles = [
      new Bubble(canvas, {
        color: "RED",
        size: 3,
        x_dir: -1,
        x_init: canvas.canvas.width * 0.25,
        y_init: 210,
        y_vel_init: 0.01
      }),
      new Bubble(canvas, {
        color: "BLUE",
        size: 3,
        x_dir: 1,
        x_init: canvas.canvas.width * 0.75,
        y_init: 210,
        y_vel_init: 0.01
      })
    ];

    this.frozen = false;

    this.play = this.play.bind(this);
    this.play();
  }

  animate() {
    this.drawBackground();
    if (this.player.harpoon) {
      this.player.harpoon.animate(this.ctx, this.images.items);
    }
    this.bubbles.forEach(bubble => bubble.animate(this.ctx, this.images.bubbles));
    this.player.animate(this.ctx, {
      right: this.images.players,
      left: this.images.mirrorPlayers,
      dying: this.images.players
    });
  }

  checkCollisions() {
    if (this.bubbles.some(bubble => bubble.collidesWith(this.player))) {
      this.frozen = true;
      this.player.orientation = "dying";
      this.player.spriteIdx = 0;
      this.lossSequenceFrame = 1;
    } else {
      let bubblesCopy = this.bubbles.slice();
      let newBubbles = [];

      bubblesCopy.forEach(bubble => {
        if (bubble.y_pos > 32) {
          newBubbles.push(bubble);
        }
      });

      if (this.player.harpoon) {
        const poppedBubbleIdx = this.bubbles.findIndex(bubble => {
          return bubble.collidesWith(this.player.harpoon);
        });
        if (poppedBubbleIdx !== -1) {
          this.player.harpoon = null;
          newBubbles.splice(poppedBubbleIdx, 1);

          const poppedBubble = this.bubbles[poppedBubbleIdx];
          if (poppedBubble.size) {
            newBubbles = newBubbles.concat([
              new Bubble(this.ctx, {
                color: poppedBubble.color,
                size: poppedBubble.size - 1,
                x_dir: -1,
                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()
              }),
              new Bubble(this.ctx, {
                color: poppedBubble.color,
                size: poppedBubble.size - 1,
                x_dir: 1,
                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()
              })
            ]);
          }
        }
      }
      this.bubbles = newBubbles;
    }
  }

  drawBackground() {
    const wall = this.ctx.createPattern(this.images.wall, "repeat");
    this.ctx.fillStyle = wall;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.drawImage(
      this.images.background, 
      8, 8, 
      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, 
      CONSTANTS.LEVEL_X, CONSTANTS.LEVEL_Y, 
      CONSTANTS.LEVEL_WIDTH, CONSTANTS.LEVEL_HEIGHT
    );
    
    this.ctx.drawImage(
      this.images.spikes,
      111, 110,
      526, 16,
      CONSTANTS.LEVEL_X + 2 * 8.5, CONSTANTS.LEVEL_Y + 2 * 8,
      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10
    );
    this.ctx.drawImage(
      this.images.spikes,
      111, 110,
      526, 16,
      CONSTANTS.LEVEL_X + 2 * 8 + (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, CONSTANTS.LEVEL_Y + 2 * 8,
      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10
    );
  }

  play() {
    window.requestAnimationFrame(this.play);
    if (!this.frozen) {
      this.update();
      this.animate();
      this.checkCollisions();
    } else {
      this.player.deathThroes(this.lossSequenceFrame);
      this.animate();
      this.lossSequenceFrame = this.lossSequenceFrame + 1;
    }
  }

  update() {
    this.player.update();
    this.bubbles.forEach(bubble => bubble.update());
  }
}