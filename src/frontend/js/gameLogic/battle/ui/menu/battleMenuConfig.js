// type definations
/**
 * @typedef {keyof typeof DIRECTION_OBJECT} Direction
 */
/** @enum {Direction} */
export const DIRECTION_OBJECT = Object.freeze({
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
  NONE: "NONE",
});

// styling for the text
export const BATTLE_MENU_TEXT_STYLE = Object.freeze({
  fontSize: "28px",
  color: "#000",
});

export const PLAYER_MENU_CURSOR_POSITION = Object.freeze({
  x: 35,
  y: 42,
});

export const MONSTER_ATTACK_CURSOR_POSITION = Object.freeze({
  x: 30,
  y: 59,
});
