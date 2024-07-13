import Phaser from "phaser";

import Preloader from "./scenes/preloader.js";
import GameController from "./scenes/gameController.js";


import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from "../config.js";

class StartGame {
  #GameObj;
  #config = {
    type: Phaser.AUTO,
    width: GAME_SCREEN_WIDTH,
    height: GAME_SCREEN_HEIGHT,
    scale: {
      parent: "game-screen-container",
    },
    physics: {
      default: "matter",
      matter: {
      gravity: { y: 0, x: 0, z: 0 },
      debug: true,
    }
      
    },
    arcade: {
        degub: true,
        gravity: 0,
      },
    pixel: true,
    scene: [Preloader, GameController],
  };

  start() {
    this.#GameObj = new Phaser.Game(this.#config);
  }
}

export default new StartGame();
