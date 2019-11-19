import Level from "./level";
import Player from "./player";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    this.level = new Level();
    this.player = new Player(canvas);
    
    this.preloaded = false;
    this.images = {};
    this.loadImages(["background", "players", "mirrorPlayers"]);
    
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
      this.player.update();
      this.level.animate(this.ctx, this.images.background);
      this.player.animate(this.ctx, {
        "right": this.images.players, 
        "left": this.images.mirrorPlayers
      });
    }
  }
}