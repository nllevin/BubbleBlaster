import BubbleBlaster from "./game";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas").getContext("2d");
  new BubbleBlaster(canvas);
});