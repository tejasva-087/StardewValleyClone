import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from "../config.js";
import { preloader } from "./scenes/preloader.js";
class MainGame {
  #config = {
    type: Phaser.AUTO,
    width: GAME_SCREEN_WIDTH,
    height: GAME_SCREEN_HEIGHT,
    scale: {
      zoom: 0.5,
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
    scene: [Preloader],
  };
  #gameObj;

  startGame() {
    this.#gameObj = new Phaser.Game(this.#config);
  }
}

export default new MainGame();
