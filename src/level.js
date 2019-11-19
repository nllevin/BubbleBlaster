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

  animate(ctx, backgroundImage) {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      backgroundImage, 
      8, 8, 
      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, 
      CONSTANTS.LEVEL_X, CONSTANTS.LEVEL_Y, 
      CONSTANTS.LEVEL_WIDTH, CONSTANTS.LEVEL_HEIGHT
    );
  }
}