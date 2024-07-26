import { HealthBar } from "../ui/healthBar";

export class BattleMonster {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @protected @type {Monster} */
  _monsterDetails;
  /** @protected @type {HealthBar} */
  _healthBar;
  /** @protected @type {Phaser.GameObjects.Image} */
  _monsterGameObject;

  /**
   * @param {BattleMonsterConfig} config
   * @param {Coordinates} position
   */
  constructor(config, position) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;

    // 1) creating the healthbar
    this._healthBar = new HealthBar(this._scene, 34, 34);

    // 2) creating the monsters
    this._monsterGameObject = this._scene.add.image(
      position.x,
      position.y,
      this._monsterDetails.assetKey,
      this._monsterDetails.assetFrame
    );
  }
}
