import Phaser from "phaser";
import { DIRECTION_OBJECT, MONSTERS, UI_ASSET_KEYS } from "../../../config.js";
import { exhaustiveGuard } from "../../../helper.js";

/**
 * @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions
 */
/** @enum {BattleMenuOptions} */
// attack options for the player
const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH: "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE",
});

// styling for the text
const BATTLE_MENU_TEXT_STYLE = Object.freeze({
  fontSize: "28px",
  color: "#000",
});

const CURSOR_OBJECT_POSITION = Object.freeze({
  x: 35,
  y: 42,
});

// ***********************************
// class BattleMenu
// ***********************************
export class BattleMenu {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #monsterAttackMenu;
  /** @type {Phaser.GameObjects.Container} */
  #subContainer;
  /** @type {Phaser.GameObjects.Text} */
  #gameLine1;
  /** @type {Phaser.GameObjects.Text} */
  #gameLine2;
  /** @type {Phaser.GameObjects.Image} */
  #mainBattleMenuCursor;
  /** @type {BattleMenuOptions} */
  #selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;

  // ***********************************
  // CONSTRUCTOR
  /**
   * @param {Phaser.Scene} scene the Phaser3 scene battle menu will be added to
   */
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

  // ***********************************
  // HIDE / SHOW METHODS

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

  // showing the main battel screen
  showMainBattelMenu() {
    this.#gameLine1.setText("What should");
    this.showSubContainer();
    this.showlines();
    this.#mainBattleMenuCursor.setPosition(
      CURSOR_OBJECT_POSITION.x,
      CURSOR_OBJECT_POSITION.y
    );
    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
  }

  // hiding the main battel screen
  hideMainBattelMenu() {
    this.#gameLine1.setText("What should");
    this.hideSubContainer();
    this.hidelines();
  }

  // ***********************************
  // UTILITY METHODS

  // creating menue text
  #createMenueText(x, y, text, style) {
    return this.#scene.add.text(x, y, text.toUpperCase(), style).setOrigin(0);
  }

  // ***********************************
  // MONSTER UI COMPONENTS

  // creating monster menue container
  #createMonsterMenuContainer(x, y) {
    this.#monsterAttackMenu = this.#scene.add.container(x, y, [
      this.#createMenueText(40, 45, "slash", BATTLE_MENU_TEXT_STYLE),
      this.#createMenueText(180, 45, "grawl", BATTLE_MENU_TEXT_STYLE),
      this.#createMenueText(40, 95, "-", BATTLE_MENU_TEXT_STYLE),
      this.#createMenueText(180, 95, "-", BATTLE_MENU_TEXT_STYLE),
    ]);
    this.hideMonsterAttacks();
    return this.#monsterAttackMenu;
  }

  // ***********************************
  // PLAYER UI COMPONENTS

  // creating the player sub info pane
  #createSubInfoPane(height, width, color, stroke) {
    return this.#scene.add
      .rectangle(0, 0, width, height, color, 1)
      .setOrigin(0)
      .setStrokeStyle(stroke.lineWidth, stroke.color, stroke.alpha);
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

  // creatint the player sub info container
  #createSubInfoContainer(x, y) {
    this.#subContainer = this.#scene.add.container(x, y, [
      // 1) creating the sub info pane
      this.#createSubInfoPane(125, 520, "0xede4f3", {
        color: "0x905ac2",
        lineWidth: 6,
        alpha: 1,
      }),
      // 2) creating the player menu
      this.#createPlayerMenue(0, 0),
      // 3) creating the cursor
      (this.#mainBattleMenuCursor = this.#scene.add
        .image(
          CURSOR_OBJECT_POSITION.x,
          CURSOR_OBJECT_POSITION.y,
          UI_ASSET_KEYS.CURSOR,
          0
        )
        .setScale(2)
        .setDepth(2.5)),
    ]);
    this.hideSubContainer();
    return this.#subContainer;
  }

  // ***********************************
  // MAIN MENU COMPONENTS

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

  // ***********************************
  // INPUT HANDLERS

  /**
   * @param { import("../../../config.js").Direction | 'OK' | 'CANCEL'} input this is weher all the player inputs will be handeled
   */
  handelPlayerInputs(input) {
    console.log(input);
    if (input === "CANCEL") {
      this.hideMonsterAttacks();
      this.showMainBattelMenu();
      return;
    }
    if (input === "OK") {
      this.showMonsterAttacks();
      this.hideMainBattelMenu();
      return;
    }
    this.#updateBattleMneuFromInput(input);
    this.#moveMainBattleMenuCursor();
  }

  /**
   * @param { import("../../../config.js").Direction} direction this is where the menu will be updated based on the input
   */
  #updateBattleMneuFromInput(direction) {
    // If the cursor is pointing to the fight option
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
      switch (direction) {
        case DIRECTION_OBJECT.RIGHT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
          return;
        case DIRECTION_OBJECT.DOWN:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
        case DIRECTION_OBJECT.UP:
        case DIRECTION_OBJECT.LEFT:
          return;
        default:
          return;
      }
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
      switch (direction) {
        case DIRECTION_OBJECT.LEFT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
          return;
        case DIRECTION_OBJECT.DOWN:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
        case DIRECTION_OBJECT.UP:
        case DIRECTION_OBJECT.RIGHT:
          return;
        default:
          return;
      }
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
      switch (direction) {
        case DIRECTION_OBJECT.RIGHT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
          return;
        case DIRECTION_OBJECT.UP:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        case DIRECTION_OBJECT.DOWN:
        case DIRECTION_OBJECT.LEFT:
          return;
        default:
          return;
      }
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
      switch (direction) {
        case DIRECTION_OBJECT.LEFT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
          return;
        case DIRECTION_OBJECT.UP:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
        case DIRECTION_OBJECT.DOWN:
        case DIRECTION_OBJECT.RIGHT:
          return;
        default:
          return;
      }
    }
  }

  // Positions the cursor according to the player's input
  #moveMainBattleMenuCursor() {
    switch (this.#selectedBattleMenuOption) {
      case BATTLE_MENU_OPTIONS.FIGHT:
        this.#mainBattleMenuCursor.setPosition(
          CURSOR_OBJECT_POSITION.x,
          CURSOR_OBJECT_POSITION.y
        );
        return;

      case BATTLE_MENU_OPTIONS.SWITCH:
        this.#mainBattleMenuCursor.setPosition(
          CURSOR_OBJECT_POSITION.x + 180,
          CURSOR_OBJECT_POSITION.y
        );
        return;

      case BATTLE_MENU_OPTIONS.ITEM:
        this.#mainBattleMenuCursor.setPosition(
          CURSOR_OBJECT_POSITION.x,
          CURSOR_OBJECT_POSITION.y + 46
        );
        return;

      case BATTLE_MENU_OPTIONS.FLEE:
        this.#mainBattleMenuCursor.setPosition(
          CURSOR_OBJECT_POSITION.x + 180,
          CURSOR_OBJECT_POSITION.y + 46
        );
        return;

      default:
        exhaustiveGuard(this.#selectedBattleMenuOption);
    }
  }
}
