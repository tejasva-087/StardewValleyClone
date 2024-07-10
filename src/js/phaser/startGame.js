import Phaser from "phaser";

import Preloader from "./scenes/preloader.js";
import MainGame from "./scenes/gameController.js";
import WorldGeneration from "./scenes/worldGeneration.js";
import Player from "./scenes/player.js";

import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from "../config.js";

class StartGame {
  #config = {
    type: Phaser.AUTO,
    width: GAME_SCREEN_WIDTH,
    height: GAME_SCREEN_HEIGHT,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "game-screen-container",
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: 0,
        debug: true,
      },
    },
    camera: {
      startView: {
        target: 0,
        clearBeforeRender: true,
        backgroundColor: "#ffffff",
      },
    },
    pixel: true,
    scene: [Preloader, WorldGeneration, MainGame, Player],
  };
  #GameObj;

  start() {
    this.#GameObj = new Phaser.Game(this.#config);
  }
}

export default new StartGame();
