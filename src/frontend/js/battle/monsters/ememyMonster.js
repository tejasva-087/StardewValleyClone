import { BattleMonster } from "./battleMonster";

/** @type {Coordinates} */
const ENEMY_POSITION = Object.freeze({
  x: 200,
  y: 300,
});

export class EnemyMonster extends BattleMonster {
  /**
   * @param {BattleMonsterConfig} config
   */
  constructor(config) {
    super(config, ENEMY_POSITION);
  }
}
