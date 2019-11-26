import Player from "./player";
import Bubble from "./bubble";
import { LEVELS, LEVEL_SPRITES_MAP, CONSTANTS } from "./levels_data";

export default class Level {
  constructor(canvas, images, level_num) {
    this.ctx = canvas;
    this.images = images;
    this.player = new Player(canvas);

    const levelSpecs = LEVELS[level_num];
    this.location = levelSpecs.location;
    this.startTime = levelSpecs.time;
    this.time = levelSpecs.time * CONSTANTS.FPS;
    this.frameScore = 0;

    this.bubbles = levelSpecs.bubbles.map(bubble => new Bubble(canvas, bubble));

    this.startCounter = 0;
    this.isStarted = false;
    this.frozen = false;

    this.start = this.start.bind(this);
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
      this.loseLife();
    } else {
      let bubblesCopy = this.bubbles.slice();
      let newBubbles = [];

      bubblesCopy.forEach(bubble => {
        if (bubble.y_pos > 32) {
          newBubbles.push(bubble);
        } else {
          this.frameScore = this.frameScore + 175;
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
                x_init: poppedBubble.x_pos + 3 / 4 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 1 / 2 * poppedBubble.radius()
              }),
              new Bubble(this.ctx, {
                color: poppedBubble.color,
                size: poppedBubble.size - 1,
                x_dir: 1,
                x_init: poppedBubble.x_pos + 3 / 4 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 1 / 2 * poppedBubble.radius()
              })
            ]);
          }

          this.frameScore = this.frameScore + (2 - Math.floor(poppedBubble.size / 2)) * 25;
        }
      }
      this.bubbles = newBubbles;
      if (this.bubbles.length === 0) {
        this.frozen = true;
        this.won = true;
      }
    }
  }

  drawBackground() {
    this.ctx.drawImage(
      this.images.background, 
      ...LEVEL_SPRITES_MAP[this.location],
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

  loseLife() {
    this.lost = true;
    this.frozen = true;
    this.player.orientation = "dying";
    this.player.spriteIdx = 0;
    this.lossSequenceFrame = 1;
  }

  over() {
    return this.lost || this.won;
  }
  
  start() {
    const levelName = this.location;
    this.ctx.font = "24px 'Press Start 2P'";
    this.animate();
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(levelName, this.ctx.canvas.width / 2 - levelName.length * 24 / 2, 100);
    if (Math.floor(this.startCounter / 30) % 2 === 0) {
      this.ctx.strokeText("GET READY", this.ctx.canvas.width / 2 - 9 * 24 / 2, 135);
    }
    
    this.startCounter = this.startCounter + 1;
    
    if (this.startCounter >= 210) {
      this.isStarted = true;
    }
  }

  step() {
    this.frameScore = 0;
    
    if (!this.frozen) {
      this.update();
      this.animate();
      this.checkCollisions();
      this.time = this.time - 1;

      if (this.time <= 0) {
        this.outOfTime = true;
        this.loseLife();
      }
    } else if (this.won) {
      this.animate();
    } else {  
      this.player.deathThroes(this.lossSequenceFrame);
      this.animate();
    }
  }

  update() {
    this.player.update();
    this.bubbles.forEach(bubble => bubble.update());
  }
}