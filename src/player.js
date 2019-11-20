import Harpoon from "./harpoon";

const CONSTANTS = {
  SPRITE_SIZE: [30, 31.5],
  FLOOR_HEIGHT: 400,
  PLAYER_WIDTH: 45,
  PLAYER_HEIGHT: 47.5,
  VEL: 2.2,
  ANIMATION_RATE: 11
};

const PLAYER_SPRITES_MAP = {
  "right": {
    "-2": [44.5, 112],
    "-1": [10.5, 112],
    0: [10.5, 2],
    1: [44.5, 2],
    2: [78.5, 2],
    3: [112.5, 2],
    4: [146.5, 2],
    5: [78.5, 2],
  },
  "left": {
    0: [355.5, 2],
    1: [321.5, 2],
    2: [287.5, 2],
    3: [254.5, 2],
    4: [220.5, 2],
    5: [287.5, 2]
  }
};

export default class Player {
  constructor(ctx) {
    this.pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;
    this.orientation = "right";
    this.spriteIdx = -1;
    this.harpoon = null;
    this.isFiring = 0;
  }

  animate(ctx, playerSprites) {
    this.update();
    ctx.drawImage(
      playerSprites[this.orientation],
      ...PLAYER_SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 6],
      ...CONSTANTS.SPRITE_SIZE,
      this.pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT,
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT
    );
  }

  update() {
    if (this.harpoon && this.harpoon.fraction >= 1) {
      this.harpoon = null;
    }

    if ((key.isPressed("space") && !this.harpoon) || this.isFiring) {
      this.harpoon = this.harpoon || new Harpoon(4 + this.pos + CONSTANTS.SPRITE_SIZE[0] / 2);
      this.isFiring = this.isFiring + 1;
      if (this.isFiring <= 1.25 * CONSTANTS.ANIMATION_RATE) {
        this.orientation = "right";
        this.spriteIdx = -2 * CONSTANTS.ANIMATION_RATE;
      } else if (this.isFiring <= 2 * CONSTANTS.ANIMATION_RATE) {
        this.orientation = "right";
        this.spriteIdx = -1;
      } else {
        this.isFiring = false;
      }
    } else if (key.isPressed("left") && this.pos > (90.4 + CONSTANTS.VEL)) {
      this.orientation = "left";
      this.spriteIdx = this.spriteIdx + 1;
      this.pos = this.pos - CONSTANTS.VEL;
    } else if (key.isPressed("right") && this.pos < (770.2 - CONSTANTS.VEL)) {
      this.orientation = "right";
      this.spriteIdx = this.spriteIdx + 1;
      this.pos = this.pos + CONSTANTS.VEL;
    } else {
      this.orientation = "right";
      this.spriteIdx = -1;
    }
  }
}