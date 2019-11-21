import Level from "./level";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    this.images = {};
    this.loadImages([
      "background", 
      "players", 
      "mirrorPlayers", 
      "items", 
      "bubbles",
      "spikes",
      "wall"
    ]);
  }

  loadImages(imageNames) {
    imageNames.forEach(imageName => {
      const image = new Image();
      
      image.onload = () => {
        this.images[imageName] = image;
        if (Object.keys(this.images).length === imageNames.length) {
          this.run();
        }
      };

      image.src = `./assets/${imageName}.png`;
    });
  }

  run() {    
    this.level = new Level(this.ctx, this.images);
  }
}