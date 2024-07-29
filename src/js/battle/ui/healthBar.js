import Phaser from "phaser";
import { HEALTH_BARS } from "../../config.js";

export class HealthBar {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #healthBarObject;
  /** @type {number} */
  #scaleY;
  /** @type {number} */
  #barWidth;
  /** @type {Phaser.GameObjects.Image} */
  #leftCap;
  /** @type {Phaser.GameObjects.Image} */
  #middleCap;
  /** @type {Phaser.GameObjects.Image} */
  #rightCap;
  /** @type {Phaser.GameObjects.Image} */
  #leftCapShadow;
  /** @type {Phaser.GameObjects.Image} */
  #middleCapShadow;
  /** @type {Phaser.GameObjects.Image} */
  #rightCapShadow;

  /**
   *
   * @param {Phaser.Scene} scene the phaser 3 scene that the healthbar will be added to
   * @param {number} x the x position
   * @param {number} y the y position
   */
  constructor(scene, x, y) {
    // 1) initializing the scene
    this.#scene = scene;
    // 2) initializing the scale and width
    this.#scaleY = 0.7;
    this.#barWidth = 360;

    // 3) creating the health bar game object
    this.#healthBarObject = this.#scene.add.container(x, y, []);

    // 4) creating the healthbar images
    this.#createHealthBarShadowImages(x, y);
    this.#createHealthBarImages(x, y);
    this.setMeterPercentage(1);
  }

  get healthBarContainer() {
    return this.#healthBarObject;
  }

  /**
   * @param {number} x the x position
   * @param {number} y the y position
   * @returns {void}
   */
  #createHealthBarImages(x, y) {
    this.#leftCap = this.#scene.add
      .image(x, y, HEALTH_BARS.LEFTCAP)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    this.#middleCap = this.#scene.add
      .image(this.#leftCap.x + this.#leftCap.width, y, HEALTH_BARS.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    this.#rightCap = this.#scene.add
      .image(
        this.#middleCap.x + this.#middleCap.displayWidth,
        y,
        HEALTH_BARS.RIGHTCAP
      )
      .setScale(1, this.#scaleY);
    this.#healthBarObject.add([this.#leftCap, this.#middleCap, this.#rightCap]);
  }

  /**
   * @param {number} x the x position
   * @param {number} y the y position
   * @returns {void}
   */
  #createHealthBarShadowImages(x, y) {
    this.#leftCapShadow = this.#scene.add
      .image(x, y, HEALTH_BARS.SHADOW_LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    this.#middleCapShadow = this.#scene.add
      .image(
        this.#leftCapShadow.x + this.#leftCapShadow.width,
        y,
        HEALTH_BARS.SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    this.#middleCapShadow.displayWidth = this.#barWidth - 5;
    this.#rightCapShadow = this.#scene.add
      .image(
        this.#middleCapShadow.x + this.#middleCapShadow.displayWidth,
        y,
        HEALTH_BARS.SHADOW_RIGHT_CAP
      )
      .setScale(1, this.#scaleY)
      .setOrigin(0, 0.5);

    this.#healthBarObject.add([
      this.#leftCapShadow,
      this.#middleCapShadow,
      this.#rightCapShadow,
    ]);
  }

  /** @param {number} [percent = 1] a number between 0 and 1 used for setting the width of the healthbar's width */
  setMeterPercentage(percent = 1) {
    const width = this.#barWidth * percent;
    this.#middleCap.displayWidth = width;
    this.#rightCap.x = this.#middleCap.x + this.#middleCap.displayWidth;
  }

  /**
   * @param {number} percent
   * @param {object} [options]
   * @param {number} [options.duration = 1000]
   * @param {() => void} [options.callback]
   */
  setMeterPercentAnimated(percent, options) {
    const width = this.#barWidth * percent;

    this.#scene.tweens.add({
      targets: this.#middleCap,
      displayWidth: width,
      duration: options?.duration || 1000,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.#rightCap.x = this.#middleCap.x + this.#middleCap.displayWidth;
        const isVisible = this.#middleCap.displayWidth > 0;
        this.#leftCap.visible = isVisible;
        this.#middleCap.visible = isVisible;
        this.#rightCap.visible = isVisible;
      },
      onComplete: options?.callback,
    });
  }
}
