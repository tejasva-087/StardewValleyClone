import { DETAIL_BAR_BG } from "../../config";
import { HealthBar } from "../ui/healthBar";

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

export class BattleMonster {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @protected @type {Monster} */
  _monsterDetails;
  /** @protected @type {HealthBar} */
  _healthBar;
  /** @protected @type {Phaser.GameObjects.Image} */
  _monsterGameObject;
  /** @protected @type {number} */
  _currentHealth;
  /** @protected @type {number} */
  _maxHealth;
  /** @protected @type {Array<MonsterAttacks>} */
  _monsterAttacks;
  /** @type {Phaser.GameObjects.Container} */
  _monsterComponentsContainer;

  /**
   * @param {BattleMonsterConfig} config
   * @param {Coordinates} position
   */
  constructor(config, position) {
    // 0) initializing the attributes
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;
    this._currentHealth = this._monsterDetails.currentHp;
    this._maxHealth = this._monsterDetails.maxHp;
    this._monsterAttacks = [];

    // 2) creating the monsters image
    this._monsterGameObject = this._scene.add.image(
      position.x,
      position.y,
      this._monsterDetails.assetKey,
      this._monsterDetails.assetFrame
    );

    // 3) creating the monster components
    this._monsterComponentsContainer = this.#createMonsterComponents(
      config.scaleDetailBarBg
    );
  }

  /** @type {boolean} */
  get isFainted() {
    return this._currentHealth <= 0;
  }

  /** @type {string} */
  get name() {
    return this._monsterDetails.name;
  }

  /** @type {MonsterAttacks[]} */
  get attacks() {
    return [...this._monsterAttacks];
  }

  /** @type {number} */
  get baseAttack() {
    return this._monsterDetails.baseAttackValue;
  }

  /** @type {number} */
  get level() {
    return this._monsterDetails.currentLevel;
  }

  /** @param {number} damage */
  /** @param {() => void} [callback] */
  takeDamage(damage, callback) {
    // for updating the current monster health and updating the monster healthbar
    this._currentHealth -= damage;

    if (this._currentHealth < 0) this._currentHealth = 0;

    this._healthBar.setMeterPercentAnimated(
      this._currentHealth / this._maxHealth,
      { callback }
    );
  }

  #createMonsterComponents(scaleDetailBarBg = 1) {
    // 0) creating the display bg
    const backgroundImage = this._scene.add
      .image(0, 0, DETAIL_BAR_BG.KEY)
      .setOrigin(0, 0)
      .setScale(1, scaleDetailBarBg);

    // 1) creating the healthbar
    this._healthBar = new HealthBar(this._scene, 34, 34);

    // 3) creating the monster name text
    const monsterName = this._scene.add.text(
      30,
      20,
      this._monsterDetails.name.toUpperCase(),
      NAME_TEXT_STYLE
    );

    // 4) creating the level and hp text
    const level = this._scene.add.text(
      monsterName.width + 45,
      20,
      `L${this.level}`,
      LEVEL_TEXT_STYLE
    );

    const health = this._scene.add.text(
      34,
      monsterName.height + 30,
      "HP",
      LEVEL_TEXT_STYLE
    );

    return this._scene.add.container(0, 0, [
      backgroundImage,
      monsterName,
      this._healthBar.healthBarContainer,
      level,
      health,
    ]);
  }
}
