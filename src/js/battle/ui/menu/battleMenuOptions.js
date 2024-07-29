/**
 * @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions
 */
/** @enum {BattleMenuOptions} */
// options for the player
export const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH: "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE",
});

/**
 * @typedef {keyof typeof MONSTER_ATTACK_OPTIONS} MonsterAttackOptions
 */
/** @enum {MonsterAttackOptions} */
// attack options for the player
export const MONSTER_ATTACK_OPTIONS = Object.freeze({
  MOVE_1: "MOVE_1",
  MOVE_2: "MOVE_2",
  MOVE_3: "MOVE_3",
  MOVE_4: "MOVE_4",
});

/**
 * @typedef {keyof typeof ACTIVE_BATTLE_MENU} ActiveBattleMenu
 */
/** @enum {MonsterAttackOptions} */
// state of player
export const ACTIVE_BATTLE_MENU = Object.freeze({
  BATTLE_MAIN: "BATTLE_MAIN",
  BATTLE_MOVE_SELECT: "BATTLE_MOVE_SELECT",
  BATTLE_ITEM: "BATTLE_ITEM",
  BATTLE_SWITCH: "BATTLE_SWITCH",
  BATTLE_FLEE: "BATTLE_FLEE",
});
