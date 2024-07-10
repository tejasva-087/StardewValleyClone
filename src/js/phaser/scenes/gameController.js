import Phaser from "phaser";

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("MainGame");
  }

  create() {
    // generating the world
    this.scene.launch("WorldGeneration");

    // spawning the player
    this.scene.launch("Player");
  }
}
