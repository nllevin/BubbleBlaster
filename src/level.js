const CONSTANTS = {
  BACKGROUND_WIDTH: 384,
  BACKGROUND_HEIGHT: 208
};

export default class Level {
  constructor(background) {
    this.background = background;
  }

  animate(ctx) {
    ctx.drawImage(
      this.background, 
      8, 8, 
      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, 
      0, 0, 
      ctx.canvas.width, ctx.canvas.height
    );
  }
}