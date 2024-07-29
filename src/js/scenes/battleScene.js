import { Scene } from "phaser";
import { SCENES, MONSTERS } from "../config.js";
import { DIRECTION_OBJECT } from "../battle/ui/menu/battleMenuConfig.js";
import { BattleMenu } from "../battle/ui/menu/battleMenu.js";
import { Background } from "../battle/background.js";
import { EnemyMonster } from "../battle/monsters/ememyMonster.js";
import { PlayerMonster } from "../battle/monsters/playerMonster.js";

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
  /** @type {BattleMenu} */
  #battleMenu;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursor;
  /** @type {EnemyMonster} */
  #activeEnemyBattleMonster;
  /** @type {PlayerMonster} */
  #activePlayerBattleMonster;

  constructor() {
    super(SCENES.BATTLE);
  }

  create() {
    // 0) creating the background
    const background = new Background(this);
    background.showForest();

    // * 1) creating the ENEMY monster and its components
    this.#activeEnemyBattleMonster = new EnemyMonster({
      scene: this,
      monsterDetails: {
        name: MONSTERS.IGUANIGNITE,
        assetKey: MONSTERS.IGUANIGNITE,
        assetFrame: 0,
        currentHp: 25,
        currentLevel: 1,
        maxHp: 25,
        attackIds: [],
        baseAttackValue: 5,
      },
    });

    // * 2) creating the PLAYER monster and its components
    this.#activePlayerBattleMonster = new PlayerMonster({
      scene: this,
      monsterDetails: {
        name: MONSTERS.CARNODUSK,
        assetKey: MONSTERS.CARNODUSK,
        assetFrame: 0,
        currentHp: 25,
        currentLevel: 2,
        maxHp: 25,
        attackIds: [],
        baseAttackValue: 5,
      },
    });

    // this.#activeEnemyBattleMonster.takeDamage(10, () => {
    //   this.#activePlayerBattleMonster.takeDamage(15);
    // });

    // 4) creating the battle UI
    this.#battleMenu = new BattleMenu(this);

    // 5) creating the cursor keys
    this.#cursor = this.input.keyboard.createCursorKeys();
    this.#cursor.down;
  }

  update() {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(
      this.#cursor.space
    );
    if (wasSpaceKeyPressed) {
      this.#battleMenu.handelPlayerInputs("OK");

      // cheking if the player has selected an attack and display text
      if (this.#battleMenu.selectedAttack === undefined) return;

      console.log(
        "Player selected the attack: ",
        this.#battleMenu.selectedAttack
      );
      this.#battleMenu.hideMonsterAttacks();
      this.#battleMenu.updateInfoPaneMessages(
        ["Yout player attacks the ememy"],
        () => {
          this.#battleMenu.showMainBattelMenu();
        }
      );

      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.#cursor.shift)) {
      this.#battleMenu.handelPlayerInputs("CANCEL");
      return;
    }
    /**
     * @type {import("../battle/ui/menu/battleMenuConfig.js").Direction}
     */
    let selectedDirection = DIRECTION_OBJECT.NONE;
    if (this.#cursor.left.isDown) {
      selectedDirection = DIRECTION_OBJECT.LEFT;
    } else if (this.#cursor.down.isDown) {
      selectedDirection = DIRECTION_OBJECT.DOWN;
    } else if (this.#cursor.right.isDown) {
      selectedDirection = DIRECTION_OBJECT.RIGHT;
    } else if (this.#cursor.up.isDown) {
      selectedDirection = DIRECTION_OBJECT.UP;
    }

    if (selectedDirection !== DIRECTION_OBJECT.NONE) {
      this.#battleMenu.handelPlayerInputs(selectedDirection);
    }
  }
}
