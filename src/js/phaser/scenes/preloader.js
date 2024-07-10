import Phaser from "phaser";

import grassTiles from "../../../assets/environment/grass.png";
import hillTiles from "../../../assets/environment/hills.png";
import collisionTiles from "../../../assets/environment/collision.png";

import treeBig from "./../../../assets/plants/tree_big.png";
import treeSmall from "./../../../assets/plants/tree_small.png";
import bush from "./../../../assets/plants/bush.png";
import mushroom from "./../../../assets/plants/mushroom.png";
import mushrooms from "./../../../assets/plants/mushrooms.png";
import flower from "./../../../assets/plants/flower.png";
import sunflower from "./../../../assets/plants/sunflower.png";

import mapJSON from "../../../resources/mapData.json";

import player from "../../../assets/characterSprite/character.png";
import playerSpriteData from "../../../assets/characterSprite/character.json";

// Tiles and objects key names
import {
  GRASS_TILES,
  HILL_TILES,
  COLLISION_TILES,
  TREE_BIG,
  TREE_SMALL,
  BUSH,
  MUSHROOM,
  MUSHROOMS,
  FLOWER,
  SUN_FLOWER,
  PLAYER,
} from "../../config.js";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // loading assets for world generation
    // 1) loading the tilesets
    this.load.image(GRASS_TILES, grassTiles);
    this.load.image(HILL_TILES, hillTiles);
    this.load.image(COLLISION_TILES, collisionTiles);
    // 2) loading the objects
    this.load.image(TREE_BIG, treeBig);
    this.load.image(TREE_SMALL, treeSmall);
    this.load.image(BUSH, bush);
    this.load.image(MUSHROOM, mushroom);
    this.load.image(MUSHROOMS, mushrooms);
    this.load.image(FLOWER, flower);
    this.load.image(SUN_FLOWER, sunflower);
    // 3) loading the map data
    this.load.tilemapTiledJSON("map", mapJSON);

    // Loading the player's sprite file
    this.load.atlas(PLAYER, player, playerSpriteData);
  }

  create() {
    this.scene.start("MainGame");
  }
}
