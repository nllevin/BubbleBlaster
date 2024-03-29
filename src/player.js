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
  },
  "dying": {
    0: [148, 78]
  }
};

export default class Player {
  constructor(ctx) {
    this.x_pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;
    this.y_pos = CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT;
    this.orientation = "right";
    this.spriteIdx = -1;
    this.harpoon = null;
    this.isFiring = 0;
  }

  animate(ctx, playerSprites) {
    ctx.drawImage(
      playerSprites[this.orientation],
      ...PLAYER_SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 6],
      ...CONSTANTS.SPRITE_SIZE,
      this.x_pos, this.y_pos,
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT
    );
  }

  deathThroes(frame) {
    if (this.harpoon) this.harpoon.frozen = true;
    this.x_pos = this.x_pos - CONSTANTS.VEL;
    this.y_pos = (CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT) - 1.5 * CONSTANTS.VEL * frame + 0.5 * 0.11 * frame * frame;
  }

  getBounds() {
    return [
      [this.x_pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT],
      [this.x_pos + CONSTANTS.PLAYER_WIDTH * 0.75, CONSTANTS.FLOOR_HEIGHT]
    ];
  }

  update() {
    if (this.harpoon && this.harpoon.fraction >= 1) {
      this.harpoon = null;
    }

    if ((key.isPressed("space") && !this.harpoon) || this.isFiring) {
      this.harpoon = this.isFiring ? this.harpoon : new Harpoon(4 + this.x_pos + CONSTANTS.SPRITE_SIZE[0] / 2);
      this.isFiring = this.isFiring + 1;
      if (this.isFiring <= 1.25 * CONSTANTS.ANIMATION_RATE) {
        this.orientation = "right";
        this.spriteIdx = -2 * CONSTANTS.ANIMATION_RATE;
      } else if (this.isFiring <= 1.75 * CONSTANTS.ANIMATION_RATE) {
        this.orientation = "right";
        this.spriteIdx = -1;
      } else {
        this.isFiring = 0;
      }
    } else if (key.isPressed("left") && this.x_pos > (90.4 + CONSTANTS.VEL)) {
      this.orientation = "left";
      this.spriteIdx = this.spriteIdx + 1;
      this.x_pos = this.x_pos - CONSTANTS.VEL;
    } else if (key.isPressed("right") && this.x_pos < (770.2 - CONSTANTS.VEL)) {
      this.orientation = "right";
      this.spriteIdx = this.spriteIdx + 1;
      this.x_pos = this.x_pos + CONSTANTS.VEL;
    } else {
      this.orientation = "right";
      this.spriteIdx = -1;
    }
  }
}