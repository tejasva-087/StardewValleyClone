export const SCREEN_WIDTH = 1024;
export const SCREEN_HEIGHT = 576;

// Assets keys
export const SCENES = Object.freeze({
  PRELOADER: "Preloader",
  BATTLE: "BattleScene",
  GAME: "Game",
});

export const BACKGROUND_IMAGE = Object.freeze({
  KEY: "backgroundForest",
});

export const DETAIL_BAR_BG = Object.freeze({
  KEY: "detailBar",
});

export const HEALTH_BARS = Object.freeze({
  RIGHTCAP: "rightcap",
  LEFTCAP: "leftCap",
  MIDDLE: "middle",
});

export const MONSTERS = Object.freeze({
  IGUANIGNITE: "iguanignite",
  CARNODUSK: "carnodusk",
});

export const UI_ASSET_KEYS = Object.freeze({
  CURSOR: "cursor",
});

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
