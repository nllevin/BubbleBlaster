const CONSTANTS = {
  BACKGROUND_WIDTH: 384,
  BACKGROUND_HEIGHT: 208,
  LEVEL_X: 76,
  LEVEL_Y: 5,
  LEVEL_WIDTH: 731 + 2 * 8,
  LEVEL_HEIGHT: 394 + 2 * 8,
};

export default class Level {
  constructor() {
  }

  animate(ctx, backgroundSprites, spikesSprites, wallSprite) {
    const wall = ctx.createPattern(wallSprite, "repeat");
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(
      backgroundSprites, 
      8, 8, 
      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, 
      CONSTANTS.LEVEL_X, CONSTANTS.LEVEL_Y, 
      CONSTANTS.LEVEL_WIDTH, CONSTANTS.LEVEL_HEIGHT
    );
    
    ctx.drawImage(
      spikesSprites,
      111, 110,
      526, 16,
      CONSTANTS.LEVEL_X + 2 * 8.5, CONSTANTS.LEVEL_Y + 2 * 8,
      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10
    );
    ctx.drawImage(
      spikesSprites,
      111, 110,
      526, 16,
      CONSTANTS.LEVEL_X + 2 * 8 + (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, CONSTANTS.LEVEL_Y + 2 * 8,
      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10
    );
  }
}