/**
 *  @typedef BattleMonsterConfig
 * @type {object}
 * @property {Phaser.Scene} scene
 * @property {Monster} monsterDetails
 * @property {number} [scaleDetailBarBg = 1]
 */

/**
 *  @typedef Monster
 * @type {object}
 * @property {string} name
 * @property {string} assetKey
 * @property {number} [assetFrame = 0]
 * @property {number} currentLevel
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {number} baseAttackValue
 * @property {Array<number>} attackIds
 */

/**
 *  @typedef Coordinates
 * @type {object}
 * @property {number} x
 * @property {number} y
 */

/**
 *  @typedef MonsterAttacks
 * @type {object}
 * @property {number} id
 * @property {string} attackname
 * @property {string}  animationName
 */
