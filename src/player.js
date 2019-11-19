const CONSTANTS = {
  STANDING_X: 11,
  STANDING_Y: 112,
  SPRITE_WIDTH: 30,
  SPRITE_HEIGHT: 31,
  FLOOR_HEIGHT: 400,
  PLAYER_WIDTH: 45,
  PLAYER_HEIGHT: 46.5,
  VEL: 2.2
};

export default class Player {
  constructor(ctx) {
    this.pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;
  }

  animate(ctx, playerImage) {
    ctx.drawImage(
      playerImage,
      CONSTANTS.STANDING_X, CONSTANTS.STANDING_Y,
      CONSTANTS.SPRITE_WIDTH, CONSTANTS.SPRITE_HEIGHT,
      this.pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT,
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT
    );
  }

  update() {
    if (key.isPressed("left") && this.pos > (90.4 + CONSTANTS.VEL)) {
      this.pos = this.pos - CONSTANTS.VEL;
    } else if (key.isPressed("right") && this.pos < (770.2 - CONSTANTS.VEL)) {
      this.pos = this.pos + CONSTANTS.VEL;
    }
  }
}