import { BattleMonster } from "./battleMonster";

/** @type {Coordinates} */
const ENEMY_POSITION = Object.freeze({
  x: 200,
  y: 300,
});

/** @type {Coordinates} */
const ENEMY_CONTAINER_POSITION = Object.freeze({
  x: 0,
  y: 0,
});

export class EnemyMonster extends BattleMonster {
  /**
   * @param {BattleMonsterConfig} config
   */
  constructor(config) {
    super(
      {
        ...config,
        scaleDetailBarBg: 0.8,
      },
      ENEMY_POSITION
    );
    this._monsterGameObject.setFlipX(true);
    this._monsterComponentsContainer.setPosition(
      ENEMY_CONTAINER_POSITION.x,
      ENEMY_CONTAINER_POSITION.y
    );
  }
}
