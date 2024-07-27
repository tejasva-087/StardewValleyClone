import { Scene } from "phaser";
import { SCENES, MONSTERS, DETAIL_BAR_BG } from "../config.js";

import { DIRECTION_OBJECT } from "../battle/ui/menu/battleMenuConfig.js";
import { BattleMenu } from "../battle/ui/menu/battleMenu.js";
import { Background } from "../battle/background.js";
import { HealthBar } from "../battle/ui/healthBar.js";
import { EnemyMonster } from "../battle/monsters/ememyMonster.js";
import { BattleMonster } from "../battle/monsters/battleMonster.js";

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
  /** @type {BattleMenu} */
  #battleMenu;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursor;
  /** @type {EnemyMonster} */
  #activeEnemyBattleMonster;

  #playerHealthBar;

  constructor() {
    super(SCENES.BATTLE);
  }

  // utility monster image generator method
  #createMonster({ x, y, key, flip = false }) {
    this.add.image(x, y, key, 0).setFlipX(flip);
  }

  // utility betailbar bg generator method
  #createMonsterDetailBar({ x, y, key = DETAIL_BAR_BG.KEY, scaleY = 1 }) {
    return this.add.image(x, y, key).setOrigin(0, 0).setScale(1, scaleY);
  }

  // utility text generator method
  #createText(x, y, text, style) {
    return this.add.text(x, y, text.toUpperCase(), style);
  }

  // Creates the player detail bar
  #createPlayerDetailContainer(x, y) {
    this.#playerHealthBar = new HealthBar(this, 34, 34);

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
      this.#playerHealthBar.healthBarContainer,
      this.#createText(438, 85, "25 / 25", HP_DETAIL_TEXT_STYLE).setOrigin(
        1,
        0
      ),
    ]);
  }

  // Creates the enemy detail bar
  // #createEnemyDetailContainer(x, y) {
  //   const enemyHealthBar = new HealthBar(this, 34, 34);
  //   const monsterName = this.#createText(
  //     30,
  //     20,
  //     MONSTERS.CARNODUSK,
  //     NAME_TEXT_STYLE
  //   );
  //   return this.add.container(x, y, [
  //     this.#createMonsterDetailBar({ x: 0, y: 0, scaleY: 0.8 }),
  //     monsterName,
  //     this.#createText(monsterName.width + 45, 20, "L5", LEVEL_TEXT_STYLE),
  //     this.#createText(34, monsterName.height + 30, "HP", HP_TEXT_STYLE),
  //     enemyHealthBar.healthBarContainer,
  //   ]);
  // }

  create() {
    // 0) creating the background
    const background = new Background(this);
    background.showForest();

    // ! 1) creating the ENEMY monster and its components
    this.#activeEnemyBattleMonster = new EnemyMonster({
      scene: this,
      monsterDetails: {
        name: MONSTERS.IGUANIGNITE,
        assetKey: MONSTERS.IGUANIGNITE,
        assetFrame: 0,
        currentHp: 25,
        maxHp: 25,
        attackIds: [],
        baseAttackValue: 5,
      },
    });
    // this.#activeEnemyBattleMonster.takeDamage(1);
    // console.log(this.#activeEnemyBattleMonster.isFainted);

    // 2) creating the monsters
    this.#createMonster({ x: 800, y: 150, key: MONSTERS.CARNODUSK });

    // 3) creating the monster detailbar
    this.#createPlayerDetailContainer(560, 315);
    // this.#createEnemyDetailContainer(0, 0);

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
