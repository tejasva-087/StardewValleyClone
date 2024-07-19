import { Scene } from "phaser";
import {
  SCENES,
  BACKGROUND_IMAGE,
  MONSTERS,
  DETAIL_BAR_BG,
  HEALTH_BARS,
} from "../config.js";
import { BattleMenu } from "../gameLogic/battle/ui/battleMenu.js";

const HP_TEXT_STYLE = Object.freeze({
  fontSize: "24px",
  color: "#FF6505",
});

const LEVEL_TEXT_STYLE = Object.freeze({
  fontSize: "24px",
  color: "#ED474B",
});

const NAME_TEXT_STYLE = Object.freeze({
  fontSize: "24px",
  color: "#7E3D3F",
});

const HP_DETAIL_TEXT_STYLE = Object.freeze({
  fontSize: "16px",
  color: "#7E3D3F",
});

export class BattleScene extends Scene {
  #battleMenu;

  constructor() {
    super(SCENES.BATTLE);
  }

  #createHealthBar(x, y) {
    const scaleY = 0.7;
    const leftCap = this.add
      .image(x, y, HEALTH_BARS.LEFTCAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middleCap = this.add
      .image(leftCap.x + leftCap.width, y, HEALTH_BARS.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCap.displayWidth = 360;
    const rightcap = this.add
      .image(middleCap.x + middleCap.displayWidth, y, HEALTH_BARS.RIGHTCAP)
      .setScale(1, scaleY);
    return this.add.container(x, y, [leftCap, middleCap, rightcap]);
  }

  #createMonster({ x, y, key, flip = false }) {
    this.add.image(x, y, key, 0).setFlip(flip);
  }

  #createMonsterDetailBar({ x, y, key = DETAIL_BAR_BG.KEY, scaleY = 1 }) {
    return this.add.image(x, y, key).setOrigin(0, 0).setScale(1, scaleY);
  }

  #createText(x, y, text, style) {
    return this.add.text(x, y, text.toUpperCase(), style);
  }

  #createPlayerDetailContainer(x, y) {
    const playerName = this.#createText(
      30,
      20,
      MONSTERS.IGUANIGNITE,
      NAME_TEXT_STYLE
    );
    return this.add.container(x, y, [
      this.#createMonsterDetailBar({ x: 0, y: 0 }),
      playerName,
      this.#createText(playerName.width + 45, 20, "L5", LEVEL_TEXT_STYLE),
      this.#createText(34, playerName.height + 30, "HP", HP_TEXT_STYLE),
      this.#createHealthBar(34, 34),
      this.#createText(438, 85, "25 / 25", HP_DETAIL_TEXT_STYLE).setOrigin(
        1,
        0
      ),
    ]);
  }

  #createEnemyDetailContainer(x, y) {
    const monsterName = this.#createText(
      30,
      20,
      MONSTERS.CARNODUSK,
      NAME_TEXT_STYLE
    );
    return this.add.container(x, y, [
      this.#createMonsterDetailBar({ x: 0, y: 0, scaleY: 0.8 }),
      monsterName,
      this.#createText(monsterName.width + 45, 20, "L5", LEVEL_TEXT_STYLE),
      this.#createText(34, monsterName.height + 30, "HP", HP_TEXT_STYLE),
      this.#createHealthBar(34, 34),
    ]);
  }

  create() {
    // 1) creating the battle scene background
    this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      BACKGROUND_IMAGE.KEY
    );

    // 2) creating the monsters
    this.#createMonster({ x: 800, y: 150, key: MONSTERS.CARNODUSK });
    this.#createMonster({
      x: 200,
      y: 300,
      key: MONSTERS.IGUANIGNITE,
      flip: true,
    });

    // 3) creating the monster detailbar
    this.#createPlayerDetailContainer(560, 315, false);
    this.#createEnemyDetailContainer(0, 0, true);
    // const enemyMonsterName = this.add
    //   .text(30, 20, MONSTERS.CARNODUSK.toUpperCase(), {
    //     color: "#7E3D3F",
    //     fontSize: "32px",
    //   })
    //   .setOrigin(0, 0);
    // this.add.container(30, 30, [
    //   this.add.image(0, 0, HEALTH_BAR.KEY).setOrigin(0, 0).setScale(1, 0.8),
    //   enemyMonsterName,
    //   this.#createHealthBar(34, 34),
    //   this.add.text(enemyMonsterName.width + 35, 23, "L5", {
    //     color: "#ED474B",
    //     fontSize: "24px",
    //   }),
    //   this.add.text(30, 55, "HP", {
    //     color: "#FF6505",
    //     fontStyle: "italic",
    //     fontSize: "24px",
    //   }),
    // ]);
    // rendering the main and sub info pane
    this.#battleMenu = new BattleMenu(this);
  }
}
