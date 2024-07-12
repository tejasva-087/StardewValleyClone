import Phaser from "phaser";
// import MatterPhysics from "phaser/plugins/matter/MatterPhysics";

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
  // PLANTS_TILESET,
  // Layers
  GRASS_LAYER,
  HILL_LAYER,
  GROUND_LAYER,
  RESTRICTED_AREA_LAYER,
  TREE_LAYER,
  BUSH_LAYER,
  MUSHROOM_LAYER,
  FLOWER_LAYER,
  PLAYER,
  PLAYER_INITIAL_FRAME,
  PLAYER_SCALE,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  VELOCITY,
} from "../../config.js";

export default class MainGame extends Phaser.Scene {
  #tileSet = [];
  #map;
  #objectLayers = [];
  #objectPairs = {
    trees: [TREE_BIG, TREE_SMALL],
    mushrooms: [MUSHROOM, MUSHROOMS],
    flowers: [FLOWER, SUN_FLOWER],
  };
  #objects;
  #collisionLayer;

  #player;
  #movementKeys = {};

  constructor() {
    super("MainGame");
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
    // this.#map.createLayer(RESTRICTED_AREA_LAYER, this.#tileSet[3]).alpha = 0;
    this.#collisionLayer = this.#map.createLayer(
      RESTRICTED_AREA_LAYER,
      this.#tileSet[3]
    );
    this.#collisionLayer.alpha = 0;
    this.#collisionLayer.setCollisionByProperty({ collides: true });

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

    // Creating the player
    this.#player = this.physics.add
      .sprite(100, 100, PLAYER, PLAYER_INITIAL_FRAME)
      .setSize(61, 74)
      .setScale(PLAYER_SCALE)
      .refreshBody();

    // Creating the movement keys for the player
    this.input.keyboard.addKeys(MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT);

    // Setting up the control keys for the player movement
    this.#movementKeys.up = this.input.keyboard.addKey(MOVE_UP);
    this.#movementKeys.down = this.input.keyboard.addKey(MOVE_DOWN);
    this.#movementKeys.left = this.input.keyboard.addKey(MOVE_LEFT);
    this.#movementKeys.right = this.input.keyboard.addKey(MOVE_RIGHT);

    // Making the camera follow the player around
    this.cameras.main.startFollow(this.#player);
    this.cameras.main.setBounds(
      0,
      0,
      this.#map.widthInPixels,
      this.#map.heightInPixels
    );

    // Adding collision between the player and restricted layer
    this.physics.add.collider(this.#player, this.#collisionLayer);

    // Setting up player animations
    // IDLE
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 1,
        prefix: "d_idle",
        suffix: ".png",
      }),
      frameRate: 1,
      repeat: -1,
    });
    // MOVE UP
    this.anims.create({
      key: "moveUp",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "u",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE DOWN
    this.anims.create({
      key: "moveDown",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "d",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE LEFT
    this.anims.create({
      key: "moveLeft",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "l",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    // MOVE RIGHT
    this.anims.create({
      key: "moveRight",
      frames: this.anims.generateFrameNames(PLAYER, {
        stat: 0,
        end: 3,
        prefix: "r",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.overlap(
      this.#player,
      this.#objects,
      (player, object) => {
        object.alpha = 0.5;
      },
      (player, object) => {
        setTimeout(() => {
          object.alpha = 1;
        }, 2);
      }
    );
  }

  update() {
    if (this.#movementKeys.up.isDown) {
      // MOVE UP
      this.#player.setVelocityY(-VELOCITY);
      this.#player.anims.play("moveUp", true);
    } else if (this.#movementKeys.down.isDown) {
      // MOVE DOWN
      this.#player.setVelocityY(VELOCITY);
      this.#player.anims.play("moveDown", true);
    } else if (this.#movementKeys.left.isDown) {
      // MOVE LEFT
      this.#player.setVelocityX(-VELOCITY);
      this.#player.anims.play("moveLeft", true);
    } else if (this.#movementKeys.right.isDown) {
      // MOVE RIGHT
      this.#player.setVelocityX(VELOCITY);
      this.#player.anims.play("moveRight", true);
    } else {
      // IDLE
      this.#player.setVelocity(0, 0);
      this.#player.anims.play("idle", true);
    }
  }
}
