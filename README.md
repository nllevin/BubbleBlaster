# Bubble Blaster

![Bubble Blaster Level 7](https://github.com/nllevin/BubbleBlaster/blob/master/level_7_screenshot.png)

[Live Link](http://bubble-blaster-9d139.web.app/)

Bubble Blaster is inspired by the perennially popular online game, Bubble Trouble, which itself was inspired by the classic video game known variously as Pomping World, Pang, and Buster Bros in its different releases.

## Instructions

Use your harpoon to blast those bouncing bubbles, but don't get hit! Arrow keys move left and right, and space fires the harpoon.

## Technologies
  * JavaScript
  * HTML5 Canvas

## Implementation

### Bubble Movement

The bubbles move along parabolic paths, in accordance with Newton's Laws and the behavior of real projectiles. In each animation frame, a bubble's height is determined by the following quadratic function:

```
  getY() {
    return 
      this.y_max 
      + this.y_vel_init * this.time 
      + 0.5 * BUBBLE_CONSTANTS.GRAVITY * this.time * this.time;
  }
```

The bubbles' movement is highly tunable: maximum height and starting speed vary according to bubble size and other starting conditions; gravity can be adjusted to achieve challenging but enjoyable gameplay. In the horizontal direction, bubbles move with constant speed (a constant distance in each animation frame):

```
this.x_pos = this.x_pos + BUBBLE_CONSTANTS.X_VEL * this.x_dir;
```

Bubbles' horizontal speed and direction are also tunable.

### Levels

The Game class tracks what level a player has reached. Information about each level's starting conditions, meanwhile, resides in a `LEVELS` object:

```
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
...
```

When the Game class initializes a new Level, the Level class accesses the `LEVELS` object in its constructor:

```
    const levelSpecs = LEVELS[levelNum];
    this.location = levelSpecs.location;
    this.startTime = levelSpecs.time;
    ...
    this.bubbles = levelSpecs.bubbles.map(bubble => new Bubble(canvas, bubble));
```

### Collisions

The Bubble class contains an algorithm to determine whether a bubble has collided with another object (either the player, causing the player to lose a life, or the harpoon, causing the bubble to burst):

```
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
```

If the bubble is above, fully to the left, or fully to the right of another object, then they have not collided; otherwise, they have. The `this.radius() / 4` term provides a small buffer zone to ensure that the bubble **appears** to collide with the other object when the algorithm determines that a collision has occurred.

## Future Features

  1. Two-player gameplay
  2. High scores
  3. Power-up items (shield, different harpoons, bonus points)
