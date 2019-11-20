const BUBBLE_SPRITES_MAP = {
  POS: {
    RED: {
      0: [106, 23],
      1: [86, 19],
      2: [52, 13],
      3: [1, 6]
    },
    BLUE: {
      0: [106, 73],
      1: [86, 69],
      2: [52, 63],
      3: [1, 56]
    },
    GREEN: {
      0: [106, 122],
      1: [86, 118],
      2: [52, 112],
      3: [1, 105]
    }
  },
  DIMS: {
    0: [8, 7],
    1: [16, 14],
    2: [32, 26],
    3: [48, 40]
  }
};

const BUBBLE_CONSTANTS = {
  DIMS: {
    0: [11, 11],
    1: [21, 21],
    2: [42, 42],
    3: [60, 60]
  },
  X_VEL: 1.1,
  GRAVITY: 0.11
};

export default class Bubble {
  constructor(ctx, bubble) {
    this.x_pos = ctx.canvas.width / 4;
    this.y_pos = bubble.y_init;
    this.y_min = bubble.y_init - BUBBLE_CONSTANTS.DIMS[bubble.size][1];
    this.color = bubble.color;
    this.size = bubble.size;
    this.x_dir = bubble.x_dir;
    this.time = 0;
  }

  animate(ctx, bubbleSprites) {
    this.update();
    ctx.drawImage(
      bubbleSprites,
      ...BUBBLE_SPRITES_MAP.POS[this.color][this.size],
      ...BUBBLE_SPRITES_MAP.DIMS[this.size],
      this.x_pos, this.y_pos,
      ...BUBBLE_CONSTANTS.DIMS[this.size]
    );
  }

  update() {
    if (this.x_pos <= 92 || this.x_pos + BUBBLE_CONSTANTS.DIMS[this.size][0] >= 807) {
      this.x_dir = -this.x_dir;
    }
    if ((this.y_min + 1 / 2 * BUBBLE_CONSTANTS.GRAVITY * this.time * this.time) >= (400 - BUBBLE_CONSTANTS.DIMS[this.size][1])) {
      // this.y_vel = -this.y_vel
      this.time = -this.time;
    } 
    // this.y_vel = Math.sqrt(2 * (this.y_max - this.y_pos) * BUBBLE_CONSTANTS.GRAVITY);
    // this.y_pos = this.y_pos + this.y_vel;
    this.y_pos = this.y_min + 1 / 2 * BUBBLE_CONSTANTS.GRAVITY * this.time * this.time;
    this.x_pos = this.x_pos + BUBBLE_CONSTANTS.X_VEL * this.x_dir;
    this.time = this.time + 1;
  }
}