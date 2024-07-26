import Phaser from "phaser";
import { BACKGROUND_IMAGE } from "../config.js";

export class Background {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Image} */
  #backgroundGameObject;

  /**
   *
   * @param {Phaser.Scene} scene the phaser 3 scene that the background will be added to
   */
  constructor(scene) {
    this.#scene = scene;

    // 1) creating the battle scene background
    this.backgroundGameObject = this.#scene.add
      .image(
        this.#scene.scale.width / 2,
        this.#scene.scale.height / 2,
        BACKGROUND_IMAGE.KEY
      )
      .setAlpha(0);
  }

  showForest() {
    this.backgroundGameObject.setTexture(BACKGROUND_IMAGE.KEY).setAlpha(1);
  }
}
