import Level from "./level";
import Player from "./player";
import Bubble from "./bubble";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    this.level = new Level();
    this.player = new Player(canvas);
    this.bubbles = [
      new Bubble(canvas, {
        color: "GREEN", 
        size: 0, 
        x_dir: -1, 
        x_init: canvas.canvas.width * 0.25,
        y_init: 210,
        y_vel_init: 0.01
      }),
      new Bubble(canvas, {
        color: "GREEN", 
        size: 3, 
        x_dir: -1,
        x_init: canvas.canvas.width * 0.75,
        y_init: 210,
        y_vel_init: 0.01
      })
    ];
    
    this.preloaded = false;
    this.images = {};
    this.loadImages([
      "background", 
      "players", 
      "mirrorPlayers", 
      "items", 
      "bubbles",
      "spikes"
    ]);
    this.frozen = false;
    
    this.play = this.play.bind(this);
    this.play();
  }
  
  animate() {
    this.level.animate(this.ctx, this.images.background, this.images.spikes);
    if (this.player.harpoon) {
      this.player.harpoon.animate(this.ctx, this.images.items);
    }
    this.bubbles.forEach(bubble => bubble.animate(this.ctx, this.images.bubbles));
    this.player.animate(this.ctx, {
      right: this.images.players, 
      left: this.images.mirrorPlayers,
      dying: this.images.players
    });
  }

  checkCollisions() {
    if (this.bubbles.some(bubble => bubble.collidesWith(this.player))) {
      this.frozen = true;
      this.player.orientation = "dying";
      this.player.spriteIdx = 0;
      this.lossSequenceFrame = 1;
    } else {
      let bubblesCopy = this.bubbles.slice();
      let newBubbles = [];

      bubblesCopy.forEach(bubble => {
        if (bubble.y_pos > 32) {
          newBubbles.push(bubble);
        }
      });

      if (this.player.harpoon) {
        const poppedBubbleIdx = this.bubbles.findIndex(bubble => {
          return bubble.collidesWith(this.player.harpoon);
        });
        if (poppedBubbleIdx !== -1) {
          this.player.harpoon = null;
          newBubbles.splice(poppedBubbleIdx, 1);

          const poppedBubble = this.bubbles[poppedBubbleIdx];
          if (poppedBubble.size) {
            newBubbles = newBubbles.concat([
              new Bubble(this.ctx, {
                color: poppedBubble.color,
                size: poppedBubble.size - 1,
                x_dir: -1,
                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()
              }),
              new Bubble(this.ctx, {
                color: poppedBubble.color,
                size: poppedBubble.size - 1,
                x_dir: 1,
                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),
                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()
              })
            ]);
          }
        }
      }
      this.bubbles = newBubbles;
    }
  }

  loadImages(imageNames) {
    imageNames.forEach(imageName => {
      const image = new Image();
      
      image.onload = () => {
        this.images[imageName] = image;
        if (Object.keys(this.images).length === imageNames.length) {
          this.preloaded = true;
        }
      };

      image.src = `./assets/${imageName}.png`;
    });
  }

  play() {
    window.requestAnimationFrame(this.play);

    if (!this.preloaded) {
      // display loading bar
    } else if (!this.frozen) {
      this.update();
      this.animate();
      this.checkCollisions();
    } else {
      this.player.deathThroes(this.lossSequenceFrame);
      this.animate();
      this.lossSequenceFrame = this.lossSequenceFrame + 1;
    }
  }

  update() {
    this.player.update();
    this.bubbles.forEach(bubble => bubble.update());
  }
}