import Phaser from "phaser";
import { Game } from "./scenes/game.js";
import { Preloader } from "./scenes/preloader.js";
import { BattleScene } from "./scenes/battleScene.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCENES } from "./config.js";

class StartGame {
  #config = {
    type: Phaser.AUTO,
    parent: "game-container",
    backgroundColor: "black",
    scale: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
  };
  #game = new Phaser.Game(this.#config); // MAIN GAME OBJECT

  constructor() {
    // Adding the scenes
    this.#game.scene.add(SCENES.PRELOADER, Preloader);
    this.#game.scene.add(SCENES.GAME, Game);
    this.#game.scene.add(SCENES.BATTLE, BattleScene);
    // Giving a starting scene
    this.#game.scene.start(SCENES.PRELOADER);
  }

  getGameObj() {
    return this.#game;
  }

  getConfigurations() {
    return this.#config;
  }
}

export default StartGame;
