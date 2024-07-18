import { Scene } from "phaser";

import {
  BACKGROUND_IMAGE,
  SCENES,
  MONSTERS,
  BATTLE_ASSETS,
  HEALTH_BAR,
  BATTLE_MENU_OPTIONS,
} from "../config.js";

export class BattleScene extends Scene {
  constructor() {
    super(SCENES.BATTLE);
  }

  #createHealthBar(x, y) {
    const scaleY = 0.7;
    const leftCap = this.add
      .image(x, y, BATTLE_ASSETS.LEFTCAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middleCap = this.add
      .image(leftCap.x + leftCap.width, y, BATTLE_ASSETS.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCap.displayWidth = 360;
    const rightcap = this.add
      .image(middleCap.x + middleCap.displayWidth, y, BATTLE_ASSETS.RIGHTCAP)
      .setScale(1, scaleY);
    return this.add.container(x, y, [leftCap, middleCap, rightcap]);
  }

  #createMainInfoPane() {
    const rectHeight = 156;
    const padding = 4;
    this.add
      .rectangle(
        padding,
        this.scale.height - rectHeight - padding + 1,
        this.scale.width - padding * 2,
        rectHeight,
        "0xede4f3",
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, "0xe4434a");
  }

  #createMainInfoSubPane() {
    const rectHeight = 156;
    const rectWidht = 700;
    return this.add
      .rectangle(0, 0, rectWidht, rectHeight, "0xede4f3", 1)
      .setOrigin(0)
      .setStrokeStyle(8, "0x905ac2");
  }

  create() {
    // 1) creating the background
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, BACKGROUND_IMAGE.KEY)
      .setScale(1.5);

    // 2) creating the monsters
    this.add.image(1086, 144, MONSTERS.CARNODUSK, 0);
    this.add.image(200, 416, MONSTERS.IGUANIGNITE, 0).setFlipX(true);

    // 3) creating healthbar components
    const playerMonsterName = this.add
      .text(30, 20, MONSTERS.IGUANIGNITE.toUpperCase(), {
        color: "#7E3D3F",
        fontSize: "32px",
      })
      .setOrigin(0, 0);
    this.add.container(900, 450, [
      this.add.image(0, 0, HEALTH_BAR.KEY).setOrigin(0, 0),
      playerMonsterName,
      this.#createHealthBar(34, 34),
      this.add.text(playerMonsterName.width + 35, 23, "L5", {
        color: "#ED474B",
        fontSize: "24px",
      }),
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontStyle: "italic",
        fontSize: "24px",
      }),
      this.add
        .text(423, 84, "25/25", {
          color: "#7E3D3F",
          fontSize: "16px",
        })
        .setOrigin(1, 0),
    ]);

    const enemyMonsterName = this.add
      .text(30, 20, MONSTERS.CARNODUSK.toUpperCase(), {
        color: "#7E3D3F",
        fontSize: "32px",
      })
      .setOrigin(0, 0);
    this.add.container(30, 30, [
      this.add.image(0, 0, HEALTH_BAR.KEY).setOrigin(0, 0).setScale(1, 0.8),
      enemyMonsterName,
      this.#createHealthBar(34, 34),
      this.add.text(enemyMonsterName.width + 35, 23, "L5", {
        color: "#ED474B",
        fontSize: "24px",
      }),
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontStyle: "italic",
        fontSize: "24px",
      }),
    ]);
    // rendering the main and sub info pane
    this.#createMainInfoPane();
    this.add.container(736, 628, [
      this.#createMainInfoSubPane(),
      this.add.text(40, 40, BATTLE_MENU_OPTIONS.FIGHT.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(260, 40, BATTLE_MENU_OPTIONS.SWITCH.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(40, 90, BATTLE_MENU_OPTIONS.ITEM.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(260, 90, BATTLE_MENU_OPTIONS.FLEE.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
    ]);

    this.add.container(0, 628, [
      this.add.text(40, 40, BATTLE_MENU_OPTIONS.SWITCH.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(240, 40, BATTLE_MENU_OPTIONS.FIGHT.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(40, 90, BATTLE_MENU_OPTIONS.FLEE.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
      this.add.text(240, 90, BATTLE_MENU_OPTIONS.ITEM.toUpperCase(), {
        fontSize: "32px",
        color: "#000",
      }),
    ]);
  }
}
