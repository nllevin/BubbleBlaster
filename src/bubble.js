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
  Y_MIN: {
    0: 310,
    1: 240,
    2: 212,
    3: 192
  },
  X_VEL: 1.1,
  GRAVITY: 0.11
};

export default class Bubble {
  constructor(ctx, bubble) {
    this.color = bubble.color;
    this.size = bubble.size;

    this.x_pos = bubble.x_init;
    this.y_pos = bubble.y_init;

    this.y_min = bubble.y_init - this.dims()[1];
    this.x_dir = bubble.x_dir;
    this.y_vel_init = bubble.y_vel_init || this.zeroTime() * BUBBLE_CONSTANTS.GRAVITY * (6 - this.size) / 6;
    this.time = 0;
  }

  animate(ctx, bubbleSprites) {
    ctx.drawImage(
      bubbleSprites,
      ...BUBBLE_SPRITES_MAP.POS[this.color][this.size],
      ...BUBBLE_SPRITES_MAP.DIMS[this.size],
      this.x_pos, this.y_pos,
      ...this.dims()
    );
  }

  center() {
    return [this.x_pos + this.dims()[0] / 2, this.y_pos + this.dims()[1] / 2];
  }

  collidesWith(obj) {
    const objBounds = obj.getBounds();
    if (
      this.center()[1] + this.radius() < objBounds[0][1] + this.radius() / 4
      || this.center()[0] + this.radius() < objBounds[0][0] + this.radius() / 4
      || this.center()[0] - this.radius() > objBounds[1][0] - this.radius() / 4
    ) {
      return false;
    } else {
      return true;
    }
  }

  dims() {
    return BUBBLE_CONSTANTS.DIMS[this.size];
  }

  getY() {
    return this.y_min + this.y_vel_init * this.time + 0.5 * BUBBLE_CONSTANTS.GRAVITY * this.time * this.time;
  }

  radius() {
    return this.dims()[0] / 2;
  }

  update() {
    if (this.x_pos <= 92 || this.x_pos + this.dims()[0] >= 807) {
      this.x_dir = -this.x_dir;
    }
    if ( this.getY() >= (400 - this.dims()[1])) {
      this.y_min = BUBBLE_CONSTANTS.Y_MIN[this.size];
      this.y_vel_init = 0;
      this.time = this.zeroTime();
    } 

    this.y_pos = this.getY();
    this.x_pos = this.x_pos + BUBBLE_CONSTANTS.X_VEL * this.x_dir;
    this.time = this.time + 1;
  }

  zeroTime() {
    return -Math.sqrt(((400 - this.dims()[1]) - BUBBLE_CONSTANTS.Y_MIN[this.size]) * 2 / BUBBLE_CONSTANTS.GRAVITY);
  }
}