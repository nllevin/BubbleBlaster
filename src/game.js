import Level from "./level";

export default class BubbleBlaster {
  constructor(canvas) {
    this.ctx = canvas;
    
    this.preloaded = false;
    this.images = {};
    this.loadImages(["background"]);
    
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
          this.level = new Level(this.images.background);
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
      this.level.animate(this.ctx);
    }
  }
}