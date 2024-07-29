import Phaser from "phaser";
import { MONSTERS, UI_ASSET_KEYS } from "../../../config.js";
import { exhaustiveGuard } from "../../../helper.js";
import {
  DIRECTION_OBJECT,
  BATTLE_MENU_TEXT_STYLE,
  PLAYER_MENU_CURSOR_POSITION,
  MONSTER_ATTACK_CURSOR_POSITION,
} from "./battleMenuConfig.js";
import {
  BATTLE_MENU_OPTIONS,
  MONSTER_ATTACK_OPTIONS,
  ACTIVE_BATTLE_MENU,
} from "./battleMenuOptions.js";

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
  /** @type {Phaser.GameObjects.Image} */
  #monsterAttackBattleMenuCursor;
  /** @type {import("./battleMenuOptions.js").BattleMenuOptions} */
  #selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
  /** @type {import("./battleMenuOptions.js").MonsterAttackOptions} */
  #selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_1;
  /**@type {import("./battleMenuOptions.js").ActiveBattleMenu}*/
  #activePlayerBattleMenu;
  /** @type {string []} */
  #queuedInfoPannelMessages;
  /** @type {() => void | undefined} */
  #queuedInfoPannelCallback;
  /** @type {boolean} */
  #waitingForPlayerInput;
  /**@type {number | undefined}  */
  #selectedAttackIndex;

  // ***********************************
  //  GETTER ANS SETTSER

  /**@type {number | undefined}  */
  get selectedAttack() {
    if (
      this.#activePlayerBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT
    ) {
      return this.#selectedAttackIndex;
    }
    return undefined;
  }

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

    // 4) Setting up the state for the player active battle menu
    // this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;

    // 5) setting the message info pannel
    this.#queuedInfoPannelMessages = [];
    this.#queuedInfoPannelCallback = undefined;
    this.#waitingForPlayerInput = false;

    // 4) setting the player attack index top undefined as they have not yet selected any attack
    this.#selectedAttackIndex = undefined;
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
    this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
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
    this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#gameLine1.setText("What should");
    this.showSubContainer();
    this.showlines();
    this.#mainBattleMenuCursor.setPosition(
      PLAYER_MENU_CURSOR_POSITION.x,
      PLAYER_MENU_CURSOR_POSITION.y
    );
    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
    this.#selectedAttackIndex = undefined;
  }

  // hiding the main battel screen
  hideMainBattelMenu() {
    this.#gameLine1.setText("What should");
    this.hideSubContainer();
    this.hidelines();
  }

  // hiding other menu and showing the main menu
  #switchToMainMenu() {
    this.hideMonsterAttacks();
    this.showMainBattelMenu();
  }

  #playerMainBattleOption() {
    this.hideMainBattelMenu();

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
      this.showMonsterAttacks();
      return;
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
      this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_ITEM;
      this.updateInfoPaneMessages(["Your bag is empty"], () => {
        this.#switchToMainMenu();
      });
      return;
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
      this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_FLEE;
      this.updateInfoPaneMessages(["You failed to run away..."], () => {
        this.#switchToMainMenu();
      });

      // todo
      return;
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
      this.#activePlayerBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_SWITCH;
      this.updateInfoPaneMessages(
        ["You have no other monstera in your party..."],
        () => {
          this.#switchToMainMenu();
        }
      );
      // todo
      return;
    }
    exhaustiveGuard(this.#selectedBattleMenuOption);
  }

  #updateInfoPaneWithMessage() {
    // 1) setting the waiting for player input to false
    this.#waitingForPlayerInput = false;

    // 2) setting the message line to null and wetting its visibility to normal
    this.#gameLine1.setText("").setAlpha(1);

    // 3) checking if all the methods have been displayed
    if (this.#queuedInfoPannelMessages.length === 0) {
      // checking if the callback exist if yes calling it
      this.#queuedInfoPannelCallback ? this.#queuedInfoPannelCallback() : null;
      // then setting it to undefined
      this.#queuedInfoPannelCallback = undefined;
      return;
    }

    // 4) if we do have messages grabbing first and remove it from queue
    const messageToDisplay = this.#queuedInfoPannelMessages.shift();

    // 5) setting the display message to the message grabbed above
    this.#gameLine1.setText(messageToDisplay);

    // 6) setting that we are waiting for player input now
    this.#waitingForPlayerInput = true;
  }

  /**
   * @param {string[]} messages
   * @param {() => void} [callback]
   */
  updateInfoPaneMessages(messages, callback) {
    this.#queuedInfoPannelMessages = messages;
    this.#queuedInfoPannelCallback = callback;

    this.#updateInfoPaneWithMessage();
  }

  #handelPlayerChooseAttack() {
    let selectedAttack = 0;
    switch (this.#selectedMonsterAttackOptions) {
      case MONSTER_ATTACK_OPTIONS.MOVE_1:
        break;
      case MONSTER_ATTACK_OPTIONS.MOVE_2:
        selectedAttack = 1;
        break;
      case MONSTER_ATTACK_OPTIONS.MOVE_3:
        selectedAttack = 2;
        break;
      case MONSTER_ATTACK_OPTIONS.MOVE_4:
        selectedAttack = 3;
        break;
      default:
        exhaustiveGuard(this.#selectedMonsterAttackOptions);
    }

    this.#selectedAttackIndex = selectedAttack;
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
      (this.#monsterAttackBattleMenuCursor = this.#scene.add
        .image(
          MONSTER_ATTACK_CURSOR_POSITION.x,
          MONSTER_ATTACK_CURSOR_POSITION.y,
          UI_ASSET_KEYS.CURSOR,
          0
        )
        .setScale(2.5)
        .setDepth(2)),
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
          PLAYER_MENU_CURSOR_POSITION.x,
          PLAYER_MENU_CURSOR_POSITION.y,
          UI_ASSET_KEYS.CURSOR,
          0
        )
        .setScale(2.5)
        .setDepth(2)),
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
   * @param { import("./battleMenuConfig.js").Direction | 'OK' | 'CANCEL'} input this is weher all the player inputs will be handeled
   */
  handelPlayerInputs(input) {
    if (this.#waitingForPlayerInput && (input === "OK" || input === "CANCEL")) {
      this.#updateInfoPaneWithMessage();
      return;
    }

    if (input === "CANCEL") {
      this.#switchToMainMenu();
      return;
    }
    if (input === "OK") {
      if (this.#activePlayerBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
        this.#playerMainBattleOption();
        return;
      }
      if (
        this.#activePlayerBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT
      ) {
        this.#handelPlayerChooseAttack();
        return;
      }
      return;
    }
    this.#updateBattleMenuFromInput(input);
    this.#moveMainBattleMenuCursor();
    this.#updateMonsterAttackMenuFromInput(input);
    this.#moveMonsterMenuCursor();
  }

  /**
   * @param { import("./battleMenuConfig.js").Direction} direction this is where the menu will be updated based on the input
   */
  #updateBattleMenuFromInput(direction) {
    if (this.#activePlayerBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) return;

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
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
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
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
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
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
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
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
    }
  }

  // Positions the cursor according to the player's input
  #moveMainBattleMenuCursor() {
    if (this.#activePlayerBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) return;

    switch (this.#selectedBattleMenuOption) {
      case BATTLE_MENU_OPTIONS.FIGHT:
        this.#mainBattleMenuCursor.setPosition(
          PLAYER_MENU_CURSOR_POSITION.x,
          PLAYER_MENU_CURSOR_POSITION.y
        );
        return;

      case BATTLE_MENU_OPTIONS.SWITCH:
        this.#mainBattleMenuCursor.setPosition(
          PLAYER_MENU_CURSOR_POSITION.x + 180,
          PLAYER_MENU_CURSOR_POSITION.y
        );
        return;

      case BATTLE_MENU_OPTIONS.ITEM:
        this.#mainBattleMenuCursor.setPosition(
          PLAYER_MENU_CURSOR_POSITION.x,
          PLAYER_MENU_CURSOR_POSITION.y + 46
        );
        return;

      case BATTLE_MENU_OPTIONS.FLEE:
        this.#mainBattleMenuCursor.setPosition(
          PLAYER_MENU_CURSOR_POSITION.x + 180,
          PLAYER_MENU_CURSOR_POSITION.y + 46
        );
        return;

      default:
        exhaustiveGuard(this.#selectedBattleMenuOption);
    }
  }
  /**
   * @param { import("./battleMenuConfig.js").Direction} direction this is where the menu will be updated based on the input
   */
  #updateMonsterAttackMenuFromInput(direction) {
    if (this.#activePlayerBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT)
      return;

    if (this.#selectedMonsterAttackOptions === MONSTER_ATTACK_OPTIONS.MOVE_1) {
      switch (direction) {
        case DIRECTION_OBJECT.RIGHT:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_2;
          return;
        case DIRECTION_OBJECT.DOWN:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_3;
        case DIRECTION_OBJECT.UP:
        case DIRECTION_OBJECT.LEFT:
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
    }
    if (this.#selectedMonsterAttackOptions === MONSTER_ATTACK_OPTIONS.MOVE_2) {
      switch (direction) {
        case DIRECTION_OBJECT.LEFT:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_1;
          return;
        case DIRECTION_OBJECT.DOWN:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_4;
        case DIRECTION_OBJECT.UP:
        case DIRECTION_OBJECT.RIGHT:
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
    }

    if (this.#selectedMonsterAttackOptions === MONSTER_ATTACK_OPTIONS.MOVE_3) {
      switch (direction) {
        case DIRECTION_OBJECT.RIGHT:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_4;
          return;
        case DIRECTION_OBJECT.UP:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_1;
        case DIRECTION_OBJECT.DOWN:
        case DIRECTION_OBJECT.LEFT:
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
    }

    if (this.#selectedMonsterAttackOptions === MONSTER_ATTACK_OPTIONS.MOVE_4) {
      switch (direction) {
        case DIRECTION_OBJECT.LEFT:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_3;
          return;
        case DIRECTION_OBJECT.UP:
          this.#selectedMonsterAttackOptions = MONSTER_ATTACK_OPTIONS.MOVE_2;
        case DIRECTION_OBJECT.DOWN:
        case DIRECTION_OBJECT.RIGHT:
        case DIRECTION_OBJECT.NONE:
          return;
        default:
          exhaustiveGuard(direction);
      }
    }
  }

  #moveMonsterMenuCursor() {
    if (this.#activePlayerBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT)
      return;

    switch (this.#selectedMonsterAttackOptions) {
      case MONSTER_ATTACK_OPTIONS.MOVE_1:
        this.#monsterAttackBattleMenuCursor.setPosition(
          MONSTER_ATTACK_CURSOR_POSITION.x,
          MONSTER_ATTACK_CURSOR_POSITION.y
        );
        return;

      case MONSTER_ATTACK_OPTIONS.MOVE_2:
        this.#monsterAttackBattleMenuCursor.setPosition(
          MONSTER_ATTACK_CURSOR_POSITION.x + 140,
          MONSTER_ATTACK_CURSOR_POSITION.y
        );
        return;

      case MONSTER_ATTACK_OPTIONS.MOVE_3:
        this.#monsterAttackBattleMenuCursor.setPosition(
          MONSTER_ATTACK_CURSOR_POSITION.x,
          MONSTER_ATTACK_CURSOR_POSITION.y + 50
        );
        return;

      case MONSTER_ATTACK_OPTIONS.MOVE_4:
        this.#monsterAttackBattleMenuCursor.setPosition(
          MONSTER_ATTACK_CURSOR_POSITION.x + 140,
          MONSTER_ATTACK_CURSOR_POSITION.y + 50
        );
        return;

      default:
        exhaustiveGuard(this.#selectedMonsterAttackOptions);
    }
  }
}
