import Phaser from "phaser";

import {
  // Tiles
  GRASS_TILES,
  HILL_TILES,
  COLLISION_TILES,
  // Objects
  TREE_BIG,
  TREE_SMALL,
  BUSH,
  MUSHROOM,
  MUSHROOMS,
  FLOWER,
  SUN_FLOWER,
  // Tilesets
  GRASS_TILESET,
  HILL_TILESET,
  COLLISION_TILESET,
  PLANTS_TILESET,
  // Layers
  GRASS_LAYER,
  HILL_LAYER,
  GROUND_LAYER,
  RESTRICTED_AREA_LAYER,
  TREE_LAYER,
  BUSH_LAYER,
  MUSHROOM_LAYER,
  FLOWER_LAYER,
} from "../../config.js";

export default class WorldGeneration extends Phaser.Scene {
  #tileSet = [];
  #map;
  #objectLayers = [];
  #objectPairs = {
    trees: [TREE_BIG, TREE_SMALL],
    mushrooms: [MUSHROOM, MUSHROOMS],
    flowers: [FLOWER, SUN_FLOWER],
  };
  #objects;

  constructor() {
    super("WorldGeneration");
  }

  generateRandomNumber(startVal, endVal) {
    // Generates random item from an array of objects between certain value
    return Math.floor(Math.random() * (endVal - startVal + 1)) + startVal;
  }

  create() {
    // creating the world
    // 1) creating the map
    this.#map = this.make.tilemap({ key: "map" });
    // 2) creating tileset
    this.#tileSet[0] = this.#map.addTilesetImage(GRASS_TILESET, GRASS_TILES);
    this.#tileSet[1] = this.#map.addTilesetImage(HILL_TILESET, HILL_TILES);
    this.#tileSet[3] = this.#map.addTilesetImage(
      COLLISION_TILESET,
      COLLISION_TILES
    );
    // 3) creating layers
    this.#map.createLayer(GROUND_LAYER, this.#tileSet[0]);
    this.#map.createLayer(HILL_LAYER, [this.#tileSet[1], this.#tileSet[0]]);
    this.#map.createLayer(GRASS_LAYER, this.#tileSet[0]);

    // 4) creating object
    this.#objectLayers[0] = this.#map.getObjectLayer(TREE_LAYER);
    this.#objectLayers[1] = this.#map.getObjectLayer(BUSH_LAYER);
    this.#objectLayers[2] = this.#map.getObjectLayer(MUSHROOM_LAYER);
    this.#objectLayers[3] = this.#map.getObjectLayer(FLOWER_LAYER);

    // Spawning random trees (big or small) from object and making them a physicsl object
    // TREES
    this.#objects = this.physics.add.staticGroup();
    this.#objectLayers[0].objects.forEach((object) => {
      this.#objects.create(
        object.x,
        object.y,
        this.#objectPairs.trees[this.generateRandomNumber(0, 1)]
      );
    });
    // BUSH
    this.#objectLayers[1].objects.forEach((object) => {
      this.#objects.create(object.x, object.y, BUSH);
    });
    // MUSHROOMS
    this.#objectLayers[2].objects.forEach((object) => {
      this.#objects.create(
        object.x,
        object.y,
        this.#objectPairs.mushrooms[[this.generateRandomNumber(0, 1)]]
      );
    });
    // FLOWERS
    this.#objectLayers[3].objects.forEach((object) => {
      this.#objects.create(
        object.x,
        object.y,
        this.#objectPairs.flowers[this.generateRandomNumber(0, 1)]
      );
    });
  }
}
