const CONSTANTS = {
  SPRITE_SIZE: [30, 31.5],
  FLOOR_HEIGHT: 400,
  PLAYER_WIDTH: 45,
  PLAYER_HEIGHT: 47.5,
  VEL: 2.2,
  ANIMATION_RATE: 11
};

const SPRITES_MAP = {
  "right": {
    "-1": [10.5, 112],
    0: [10.5, 2],
    1: [44.5, 2],
    2: [78.5, 2],
    3: [112.5, 2],
    4: [146.5, 2]
  },
  "left": {
    0: [355.5, 2],
    1: [321.5, 2],
    2: [287.5, 2],
    3: [254.5, 2],
    4: [220.5, 2],
  }
};

export default class Player {
  constructor(ctx) {
    this.pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;
    this.orientation = "right";
    this.spriteIdx = -1;
  }

  animate(ctx, playerSprites) {
    ctx.drawImage(
      playerSprites[this.orientation],
      ...(SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 5]),
      ...CONSTANTS.SPRITE_SIZE,
      this.pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT,
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT
    );
  }

  update() {
    if (key.isPressed("left") && this.pos > (90.4 + CONSTANTS.VEL)) {
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