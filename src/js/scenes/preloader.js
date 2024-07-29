import { Scene } from "phaser";

// ** background image **
// @ts-ignore
import batelBg from "../../assets/images/monster-tamer/battle-backgrounds/forest-background.png";
// @ts-ignore
import detailBar from "../../assets/images/kenneys-assets/ui-space-expansion/custom-ui.png";
// @ts-ignore

// ** Healthbar images **
import rightcap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_right.png";
// @ts-ignore
import leftCap from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_left.png";
// @ts-ignore
import middle from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_mid.png";
// @ts-ignore
import middleShadow from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_shadow_mid.png";
// @ts-ignore
import rightShadow from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_shadow_right.png";
// @ts-ignore
import leftShadow from "../../assets/images/kenneys-assets/ui-space-expansion/barHorizontal_shadow_left.png";

// ** monster images **
// @ts-ignore
import iguanignite from "../../assets/images/monster-tamer/monsters/iguanignite.png";
// @ts-ignore
import carnodusk from "../../assets/images/monster-tamer/monsters/carnodusk.png";

// ** ui images **
// @ts-ignore
import cursor from "../../assets/images/monster-tamer/ui/cursor.png";

import {
  BACKGROUND_IMAGE,
  DETAIL_BAR_BG,
  HEALTH_BARS,
  MONSTERS,
  UI_ASSET_KEYS,
  SCENES,
} from "../config.js";

export class Preloader extends Scene {
  constructor() {
    super(SCENES.PRELOADER);
  }

  preload() {
    // Battle backgrounds
    this.load.image(BACKGROUND_IMAGE.BACKGROUND_IMAGE, batelBg);

    // detailBar
    this.load.image(DETAIL_BAR_BG.DETAIL_BAR_BG, detailBar);

    // Battel assets
    this.load.image(HEALTH_BARS.RIGHT_CAP, rightcap);
    this.load.image(HEALTH_BARS.LEFT_CAP, leftCap);
    this.load.image(HEALTH_BARS.MIDDLE_CAP, middle);
    this.load.image(HEALTH_BARS.MIDDLE_SHADOW_CAP, middleShadow);
    this.load.image(HEALTH_BARS.RIGHT_SHADOW_CAP, rightShadow);
    this.load.image(HEALTH_BARS.LEFT_SHADOW_CAP, leftShadow);

    // Loading the monsters
    this.load.image(MONSTERS.IGUANIGNITE, iguanignite);
    this.load.image(MONSTERS.CARNODUSK, carnodusk);

    // Loading UI assets
    this.load.image(UI_ASSET_KEYS.CURSOR, cursor);
  }

  create() {
    // Starting the battle scene
    this.scene.start(SCENES.BATTLE);
  }
}
