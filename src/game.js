import Level from "./level";
import Player from "./player";
import Bubble from "./bubble";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    this.level = new Level();
    this.player = new Player(canvas);
    this.bubble = new Bubble(canvas, {
      color: "GREEN", 
      size: 0, 
      x_dir: 1, 
      y_init: 210
    });
    
    this.preloaded = false;
    this.images = {};
    this.loadImages([
      "background", 
      "players", 
      "mirrorPlayers", 
      "items", 
      "bubbles"
    ]);
    
    this.animate = this.animate.bind(this);
    this.animate();
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

  animate() {
    window.requestAnimationFrame(this.animate);

    if (!this.preloaded) {
      // display loading bar
    } else {
      this.level.animate(this.ctx, this.images.background);
      if (this.player.harpoon) {
        this.player.harpoon.animate(this.ctx, this.images.items);
      }
      this.player.animate(this.ctx, {
        "right": this.images.players, 
        "left": this.images.mirrorPlayers
      });
      this.bubble.animate(this.ctx, this.images.bubbles);
    }
  }
}