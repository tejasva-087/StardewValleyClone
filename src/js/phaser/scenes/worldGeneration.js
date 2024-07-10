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
  #object = [];
  #objectPairs = {
    trees: [TREE_BIG, TREE_SMALL],
    mushrooms: [MUSHROOM, MUSHROOMS],
    flowers: [FLOWER, SUN_FLOWER],
  };

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
    this.#object[0] = this.#map.getObjectLayer(TREE_LAYER);
    this.#object[1] = this.#map.getObjectLayer(BUSH_LAYER);
    this.#object[2] = this.#map.getObjectLayer(MUSHROOM_LAYER);
    this.#object[3] = this.#map.getObjectLayer(FLOWER_LAYER);

    // Spawning random trees (big or small) from object and making them a physicsl object
    // For Generating trees
    this.#object[0].objects.forEach((object) => {
      this.physics.add.image(
        object.x,
        object.y,
        this.#objectPairs.trees[this.generateRandomNumber(0, 1)]
      );
    });
    this.#object[1].objects.forEach((object) => {
      this.physics.add.image(object.x, object.y, BUSH);
    });
    this.#object[2].objects.forEach((object) => {
      this.physics.add.image(
        object.x,
        object.y,
        this.#objectPairs.mushrooms[[this.generateRandomNumber(0, 1)]]
      );
    });
    this.#object[3].objects.forEach((object) => {
      this.physics.add.image(
        object.x,
        object.y,
        this.#objectPairs.flowers[this.generateRandomNumber(0, 1)]
      );
    });
  }
}
