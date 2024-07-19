import { Scene } from "phaser";

// @ts-ignore
import batelBg from "../../assets/images/monster-tamer/battle-backgrounds/forest-background.png";
// @ts-ignore
import detailBar from "../../assets/images/kenneys-assets/ui-space-expansion/custom-ui.png";
// @ts-ignore
import rightcap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_right.png";
// @ts-ignore
import leftCap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_left.png";
// @ts-ignore
import middle from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_mid.png";
// @ts-ignore
import iguanignite from "../../assets/images/monster-tamer/monsters/iguanignite.png";
// @ts-ignore
import carnodusk from "../../assets/images/monster-tamer/monsters/carnodusk.png";

import {
  BACKGROUND_IMAGE,
  DETAIL_BAR_BG,
  HEALTH_BARS,
  MONSTERS,
} from "../config.js";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Battle backgrounds
    this.load.image(BACKGROUND_IMAGE.KEY, batelBg);

    // detailBar
    this.load.image(DETAIL_BAR_BG.KEY, detailBar);

    // Battel assets
    this.load.image(HEALTH_BARS.RIGHTCAP, rightcap);
    this.load.image(HEALTH_BARS.LEFTCAP, leftCap);
    this.load.image(HEALTH_BARS.MIDDLE, middle);

    // Loading the monsters
    this.load.image(MONSTERS.IGUANIGNITE, iguanignite);
    this.load.image(MONSTERS.CARNODUSK, carnodusk);
  }

  create() {
    // Starting the battle scene
    this.scene.start("BattleScene");
  }
}
