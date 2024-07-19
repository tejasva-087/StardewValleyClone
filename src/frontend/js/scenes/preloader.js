import { Scene } from "phaser";

import batelBg from "../../assets/images/monster-tamer/battle-backgrounds/forest-background.png";
import healthBar from "../../assets/images/kenneys-assets/ui-space-expansion/custom-ui.png";
import rightcap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_right.png";
import leftCap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_left.png";
import middle from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_mid.png";
import iguanignite from "../../assets/images/monster-tamer/monsters/iguanignite.png";
import carnodusk from "../../assets/images/monster-tamer/monsters/carnodusk.png";

import {
  BACKGROUND_IMAGE,
  HEALTH_BAR,
  BATTLE_ASSETS,
  MONSTERS,
} from "../config.js";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Battle backgrounds
    this.load.image(BACKGROUND_IMAGE.KEY, batelBg);

    // Healthbar
    this.load.image(HEALTH_BAR.KEY, healthBar);

    // Battel assets
    this.load.image(BATTLE_ASSETS.RIGHTCAP, rightcap);
    this.load.image(BATTLE_ASSETS.LEFTCAP, leftCap);
    this.load.image(BATTLE_ASSETS.MIDDLE, middle);

    // Loading the monsters
    this.load.image(MONSTERS.IGUANIGNITE, iguanignite);
    this.load.image(MONSTERS.CARNODUSK, carnodusk);
  }

  create() {
    // Starting the battle scene
    this.scene.start("BattleScene");
  }
}
