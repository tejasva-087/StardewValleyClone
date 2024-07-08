import Phaser from "phaser";

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("MainGame");
  }

  create() {
    this.scene.launch("WorldGeneration");
  }
}
