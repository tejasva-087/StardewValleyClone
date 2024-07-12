import Phaser from "phaser";

import {
  PLAYER,
  PLAYER_INITIAL_FRAME,
  PLAYER_SCALE,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  VELOCITY,
} from "../../config.js";

export default class Player extends Phaser.Scene {
  #player;
  #movementKeys = {};

  constructor() {
    super("Player");
  }

  getPlayer() {
    return this.#player;
  }

  create() {
    // Creating the player
    this.#player = this.physics.add
      .sprite(100, 100, PLAYER, PLAYER_INITIAL_FRAME)
      .setSize(61, 74)
      .setScale(PLAYER_SCALE)
      .refreshBody();

    // Creating the movement keys for the player
    this.input.keyboard.addKeys(MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT);

    // Setting up the control keys for the player movement
    this.#movementKeys.up = this.input.keyboard.addKey(MOVE_UP);
    this.#movementKeys.down = this.input.keyboard.addKey(MOVE_DOWN);
    this.#movementKeys.left = this.input.keyboard.addKey(MOVE_LEFT);
    this.#movementKeys.right = this.input.keyboard.addKey(MOVE_RIGHT);

    // Setting up player animations
    // IDLE
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 1,
        prefix: "d_idle",
        suffix: ".png",
      }),
      frameRate: 1,
      repeat: -1,
    });
    // MOVE UP
    this.anims.create({
      key: "moveUp",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "u",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE DOWN
    this.anims.create({
      key: "moveDown",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "d",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE LEFT
    this.anims.create({
      key: "moveLeft",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "l",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE RIGHT
    this.anims.create({
      key: "moveRight",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "r",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.#movementKeys.up.isDown) {
      // MOVE UP
      this.#player.setVelocity(0, -VELOCITY);
      this.#player.anims.play("moveUp", true);
    } else if (this.#movementKeys.down.isDown) {
      // MOVE DOWN
      this.#player.setVelocity(0, VELOCITY);
      this.#player.anims.play("moveDown", true);
    } else if (this.#movementKeys.left.isDown) {
      // MOVE LEFT
      this.#player.setVelocity(-VELOCITY, 0);
      this.#player.anims.play("moveLeft", true);
    } else if (this.#movementKeys.right.isDown) {
      // MOVE RIGHT
      this.#player.setVelocity(VELOCITY, 0);
      this.#player.anims.play("moveRight", true);
    } else {
      // IDLE
      this.#player.setVelocity(0, 0);
      this.#player.anims.play("idle", true);
    }
  }
}
