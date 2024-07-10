import Phaser from "phaser";

import { PLAYER, PLAYER_INITIAL_FRAME } from "../../config.js";

export default class Player extends Phaser.Scene {
  constructor() {
    super("Player");
  }

  create() {
    // Creating the player
    this.character = this.add.sprite(100, 100, PLAYER, PLAYER_INITIAL_FRAME);

    // Creating the movement keys for the player
  }
}
