const HARPOON_CONSTANTS = {
  SPRITE_POS: [399, 1564],
  SPRITE_DIMS: [10, 188],
  WIDTH: 17,
  MAX_HEIGHT: 387,
  INIT_FRACTION: 0.095,
  CEILING_HEIGHT: 14,
  FLIGHT_TIME: 1.75,
  FPS: 60
}

export default class Harpoon {
  constructor(x_pos) {
    this.x_pos = x_pos;
    this.y_pos = HARPOON_CONSTANTS.CEILING_HEIGHT + HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION);
    this.fraction = HARPOON_CONSTANTS.INIT_FRACTION;
  }

  animate(ctx, itemsSprites) {
    this.update();
    ctx.drawImage(
      itemsSprites,
      ...HARPOON_CONSTANTS.SPRITE_POS,
      HARPOON_CONSTANTS.SPRITE_DIMS[0], HARPOON_CONSTANTS.SPRITE_DIMS[1] * this.fraction,
      this.x_pos, this.y_pos,
      HARPOON_CONSTANTS.WIDTH, HARPOON_CONSTANTS.MAX_HEIGHT * this.fraction
    )
  }

  getBounds() {
    return [
      [this.x_pos, this.y_pos],
      [this.x_pos + HARPOON_CONSTANTS.WIDTH, 400]
    ];
  }

  update() {
    if (this.y_pos > HARPOON_CONSTANTS.CEILING_HEIGHT) {
      this.fraction = this.fraction + (1 - HARPOON_CONSTANTS.INIT_FRACTION) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);
      this.y_pos = this.y_pos - (HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION)) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);
    }
  }
}