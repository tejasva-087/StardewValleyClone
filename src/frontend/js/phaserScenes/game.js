import { Scene } from "phaser";

import { SCENES } from "../config.js";

export class Game extends Scene {
  constructor() {
    super(SCENES.GAME);
  }
}
