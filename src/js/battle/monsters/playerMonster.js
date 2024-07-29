import { BattleMonster } from "./battleMonster";

/** @type {Coordinates} */
const PLAYER_POSITION = Object.freeze({
  x: 800,
  y: 150,
});

/** @type {Coordinates} */
const PLAYER_CONTAINER_POSITION = Object.freeze({
  x: 560,
  y: 318,
});

const HP_TEXT_STYLE = Object.freeze({
  fontSize: "24px",
  color: "#FF6505",
});

export class PlayerMonster extends BattleMonster {
  /** @type {Phaser.GameObjects.Text} */
  #healthPoints;

  /**
   * @param {BattleMonsterConfig} config
   */
  constructor(config) {
    super(config, PLAYER_POSITION);
    // 1) setting the container object positions
    this._monsterComponentsContainer.setPosition(
      PLAYER_CONTAINER_POSITION.x,
      PLAYER_CONTAINER_POSITION.y
    );

    // 2) creating the healthpoints text object
    this.#addHealthPointsText();
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
    this.#setHelathBarText();
  }

  #setHelathBarText() {
    this.#healthPoints.setText(`${this._currentHealth}/${this._maxHealth}`);
  }

  #addHealthPointsText() {
    this.#healthPoints = this._scene.add
      .text(352, 80, "", HP_TEXT_STYLE)
      .setOrigin(0, 0);
    this._monsterComponentsContainer.add(this.#healthPoints);
    this.#setHelathBarText();
  }
}
