import { MONSTERS } from "../../../config.js";

// attack options for the player
const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "fight",
  SWITCH: "switch",
  ITEM: "item",
  FLEE: "flee",
});

// styling for the text
const BATTLE_MENU_TEXT_STYLE = Object.freeze({
  fontSize: "28px",
  color: "#000",
});

export class BattleMenu {
  #scene;
  #monsterAttackMenu;
  #subContainer;
  #gameLine1;
  #gameLine2;

  // show lines
  showlines() {
    this.#gameLine1.setAlpha(1);
    this.#gameLine2.setAlpha(1);
  }
  // hide lines
  hidelines() {
    this.#gameLine1.setAlpha(0);
    this.#gameLine2.setAlpha(0);
  }

  // show monster attack menu
  showMonsterAttacks() {
    this.#monsterAttackMenu.setAlpha(1);
  }
  // hide monster attack menu
  hideMonsterAttacks() {
    this.#monsterAttackMenu.setAlpha(0);
  }

  // show monster sub container
  showSubContainer() {
    this.#subContainer.setAlpha(1);
  }
  // hide monster sub container
  hideSubContainer() {
    this.#subContainer.setAlpha(0);
  }

  // showing the battel screen
  showMainBattelMenu() {
    this.#gameLine1.setText("What should");
    this.showSubContainer();
    this.showlines();
  }

  hideBattleScene() {}

  // creating menue text
  #createMenueText(x, y, text, style) {
    return this.#scene.add.text(x, y, text.toUpperCase(), style).setOrigin(0);
  }

  // creating monster menue container
  #createMonsterMenuContainer(x, y) {
    this.#monsterAttackMenu = this.#scene.add.container(x, y, [
      this.#createMenueText(
        40,
        45,
        BATTLE_MENU_OPTIONS.FIGHT,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        180,
        45,
        BATTLE_MENU_OPTIONS.SWITCH,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        40,
        95,
        BATTLE_MENU_OPTIONS.ITEM,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        180,
        95,
        BATTLE_MENU_OPTIONS.FLEE,
        BATTLE_MENU_TEXT_STYLE
      ),
    ]);
    this.hideMonsterAttacks();
    return this.#monsterAttackMenu;
  }

  // creating player menue
  #createPlayerMenue(x, y) {
    return this.#scene.add.container(x, y, [
      this.#createMenueText(
        45,
        28,
        BATTLE_MENU_OPTIONS.FIGHT,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        225,
        28,
        BATTLE_MENU_OPTIONS.SWITCH,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        40,
        75,
        BATTLE_MENU_OPTIONS.ITEM,
        BATTLE_MENU_TEXT_STYLE
      ),
      this.#createMenueText(
        225,
        75,
        BATTLE_MENU_OPTIONS.FLEE,
        BATTLE_MENU_TEXT_STYLE
      ),
    ]);
  }

  // creating the player sub info pane
  #createSubInfoPane(height, width, color, stroke) {
    return this.#scene.add
      .rectangle(0, 0, width, height, color, 1)
      .setOrigin(0)
      .setStrokeStyle(stroke.lineWidth, stroke.color, stroke.alpha);
  }

  // creatint the player sub info container
  #createSubInfoContainer(x, y) {
    this.#subContainer = this.#scene.add.container(x, y, [
      // 1) creating the sub info pane
      this.#createSubInfoPane(125, 520, "0xede4f3", {
        color: "0x905ac2",
        lineWidth: 6,
        alpha: 1,
      }),
      this.#createPlayerMenue(0, 0),
    ]);
    this.hideSubContainer();
    return this.#subContainer;
  }

  // creating the main main menu pane
  #createMainInfoPane(height, padding, color, stroke) {
    this.#gameLine1 = this.#scene.add
      .text(20, 468, `What should`, BATTLE_MENU_TEXT_STYLE)
      .setDepth(2);
    this.#gameLine2 = this.#scene.add
      .text(
        20,
        512,
        `${MONSTERS.IGUANIGNITE.toUpperCase()} do next?`,
        BATTLE_MENU_TEXT_STYLE
      )
      .setDepth(2);
    this.hidelines();
    return this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - height - padding,
        this.#scene.scale.width - padding * 2,
        height,
        color,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(stroke.lineWidth, stroke.color, stroke.alpha);
  }

  constructor(scene) {
    this.#scene = scene;

    // 1) Creating the main info pane
    this.#createMainInfoPane(125, 4, "0xede4f3", {
      color: "0xe4434a",
      lineWidth: 6,
      alpha: 1,
    });

    // 2) creating the monster menue
    this.#createMonsterMenuContainer(0, 428);

    // 2) Creating the sub info pane
    this.#createSubInfoContainer(503, 446);
  }
}
