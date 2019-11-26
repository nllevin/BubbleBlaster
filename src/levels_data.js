export const CONSTANTS = {
  BACKGROUND_WIDTH: 384,
  BACKGROUND_HEIGHT: 208,
  LEVEL_X: 76,
  LEVEL_Y: 5,
  LEVEL_WIDTH: 731 + 2 * 8,
  LEVEL_HEIGHT: 394 + 2 * 8,
  FPS: 60
};

export const LEVELS = {
  1: {
    location: "MOUNT FUJI",
    time: 45,
    bubbles: [
      {
        color: "RED",
        size: 1,
        x_init: CONSTANTS.LEVEL_X + 1 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 1,
        y_vel_init: 0
      }
    ]
  },
  2: {
    location: "TAJ MAHAL",
    time: 45,
    bubbles: [
      {
        color: "BLUE",
        size: 2,
        x_init: CONSTANTS.LEVEL_X + 1 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 1,
        y_vel_init: 0
      }
    ]
  },
  3: {
    location: "ARC DE TRIOMPHE",
    time: 45,
    bubbles: [
      {
        color: "GREEN",
        size: 3,
        x_init: CONSTANTS.LEVEL_X + 1 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 1,
        y_vel_init: 0
      }
    ]
  },
  4: {
    location: "BIG BEN",
    time: 45,
    bubbles: [
      {
        color: "RED",
        size: 2,
        x_init: CONSTANTS.LEVEL_X + 1 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: -1,
        y_vel_init: 0
      },
      {
        color: "RED",
        size: 2,
        x_init: CONSTANTS.LEVEL_X + 5 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 1,
        y_vel_init: 0
      }
    ]
  },
  5: {
    location: "PARTHENON",
    time: 45,
    bubbles: [
      ...[0, 1, 2, 3].map(idx => ({
        color: "BLUE",
        size: 0,
        x_init: CONSTANTS.LEVEL_X + 16 + 25 + 85 * idx,
        y_init: idx % 2 === 0 ? 300 : 375,
        x_dir: -1,
        y_vel_init: 0
      })),
      ...[0, 1, 2, 3].map(idx => ({
        color: "BLUE",
        size: 0,
        x_init: CONSTANTS.LEVEL_X + CONSTANTS.LEVEL_WIDTH - (16 + 25 + 85 * idx),
        y_init: idx % 2 === 0 ? 300 : 375,
        x_dir: 1,
        y_vel_init: 0
      }))
    ]
  },
  6: {
    location: "SPHINX",
    time: 45,
    bubbles: [
      ...["RED", "BLUE", "GREEN"].map((color, idx) => ({
        color,
        size: 0,
        x_init: CONSTANTS.LEVEL_X + 16 + 30 + 30 * idx,
        y_init: 300,
        x_dir: 1,
        y_vel_init: 0
      })),
      ...["RED", "BLUE", "RED"].map((color, idx) => ({
        color,
        size: 0,
        x_init: CONSTANTS.LEVEL_X + 16 + 180 + 30 * idx,
        y_init: 300,
        x_dir: 1,
        y_vel_init: 0
      })),
      ...["RED", "BLUE", "RED"].map((color, idx) => ({
        color,
        size: 0,
        x_init: CONSTANTS.LEVEL_X + CONSTANTS.LEVEL_WIDTH - (16 + 180 + 30 * idx),
        y_init: 300,
        x_dir: -1,
        y_vel_init: 0
      })),
      ...["RED", "BLUE", "GREEN"].map((color, idx) => ({
        color,
        size: 0,
        x_init: CONSTANTS.LEVEL_X + CONSTANTS.LEVEL_WIDTH - (16 + 30 + 30 * idx),
        y_init: 300,
        x_dir: -1,
        y_vel_init: 0
      }))
    ]
  },
  7: {
    location: "STATUE OF LIBERTY",
    time: 60,
    bubbles: [
      {
        color: "BLUE",
        size: 2,
        x_init: CONSTANTS.LEVEL_X + 1 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: -1,
        y_vel_init: 0
      },
      {
        color: "BLUE",
        size: 2,
        x_init: CONSTANTS.LEVEL_X + 5 / 6 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 1,
        y_vel_init: 0
      },
      {
        color: "RED",
        size: 3,
        x_init: CONSTANTS.LEVEL_X + 1 / 2 * CONSTANTS.LEVEL_WIDTH,
        y_init: CONSTANTS.LEVEL_Y + 1 / 2 * CONSTANTS.LEVEL_HEIGHT,
        x_dir: 0,
        y_vel_init: 0
      }
    ]
  }
};

export const LEVEL_SPRITES_MAP = {
  "MOUNT FUJI": [8, 8],
  "TAJ MAHAL": [400, 1520],
  "ARC DE TRIOMPHE": [400, 2168],
  "BIG BEN": [8, 2600],
  "PARTHENON": [8, 3248],
  "SPHINX": [400, 3464],
  "STATUE OF LIBERTY": [400, 4112]
};