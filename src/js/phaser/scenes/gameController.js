import Phaser from "phaser";
import { PLAYER_SPEED } from "../../config.js";


export default class GameController extends Phaser.Scene {
  #player;
  #playerBody;
  #playerDirection;
  #map;
  _wkey;
  _akey;
  _skey;
  _dkey;

  constructor() {
    super("MainGame");
  }

  #generateRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  create() {
    // 1) Creating map
    this.#map = this.make.tilemap({ key: "map" });

    // 2) Creating tilesets
    const grassTileSet = this.#map.addTilesetImage("Grass", "grass");
    const hillTileSet = this.#map.addTilesetImage("Hills", "hills");
    const collisionTileSet = this.#map.addTilesetImage(
      "Collisions",
      "collision"
    );

    // 3) Creating layers
    this.#map.createLayer("Ground", grassTileSet);
    this.#map.createLayer("Grass", grassTileSet);

    // 4) setting up collision layers
    // hill
    const hillLayer = this.#map
      .createLayer("Hills", hillTileSet)
    hillLayer.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(hillLayer);

    // restricted layer
    const collisionLayer = this.#map.createLayer(
      "RestrictedLayer",
      collisionTileSet
    );
    collisionLayer.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(collisionLayer);
    collisionLayer.setAlpha(0);
    
    // 1) trees
    const trees = this.#map.getObjectLayer("Tree");
    trees.objects.forEach((tree) => {
      this.matter.add
        .image(tree.x, tree.y + 40, "treeBig", undefined, {
          isStatic: true,
        })
        .setFixedRotation(0)
        .setBody({
          type: "fromVerts",
          verts: [
            { x: 0, y: 0 },
            { x: 26.8421, y: 0.394737 },
            { x: 31.9737, y: 15.7895 },
            { x: 33.9474, y: 18.1579 },
            { x: 18.5526, y: 24.0789 },
            { x: 14.6053, y: 27.2368 },
            { x: -4.34211, y: 16.9737 },
          ],
        })
        .setStatic(true)
        .setDepth(2)
        .setOrigin(0.5, 0.85).setName('tree').setInteractive()
    });
    

    // Creating player spawn points
    const spawnLayer = this.#map.getObjectLayer("SpawnPoint");
    const randomSpawnPoint = this.#generateRandomNumber(0, spawnLayer.objects.length - 1);

    // spawning player randomly and setting its properties
    this.#player = this.matter.add.sprite(
      spawnLayer.objects[randomSpawnPoint].x,
      spawnLayer.objects[randomSpawnPoint].y,
      "player",
      "d_idle0.png"
    ).setBody({
      type: "rectangle",
      width: 52, 
      height: 54, 
    }).setFixedRotation(0).setScale(0.75).setDepth(1).setName('player');

    // Setting up the collision
    this.matter.world.on("collisionstart", (e, bodyA, bodyB) => {
      if (bodyB.gameObject?.name === 'player' && bodyA.gameObject?.name === 'tree') {
        bodyA.gameObject.setAlpha(0.5);
        bodyA.gameObject.on("pointerdown", () => {
          bodyA.gameObject?.destroy();
        });
      }
    });

    this.matter.world.on("collisionend", (e, bodyA, bodyB) => {
      if (
        bodyB.gameObject?.name === "player" &&
        bodyA.gameObject?.name === "tree"
      ) {
        bodyA.gameObject?.setAlpha(1);
      }
    });

    this._wkey = this.input.keyboard.addKey("W");
    this._akey = this.input.keyboard.addKey("A");
    this._skey = this.input.keyboard.addKey("S");
    this._dkey = this.input.keyboard.addKey("D");

    this.cameras.main.startFollow(this.#player);
    this.cameras.main.setBounds(
      0,
      0,
      this.#map.widthInPixels,
      this.#map.heightInPixels
    );

    this.anims.create({
      key: "downidle",
      frames: this.anims.generateFrameNames("player", {
        stat: 0,
        end: 1,
        prefix: "d_idle",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "upidle",
      frames: this.anims.generateFrameNames("player", {
        stat: 0,
        end: 1,
        prefix: "u_idle",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "leftidle",
      frames: this.anims.generateFrameNames("player", {
        stat: 0,
        end: 1,
        prefix: "l_idle",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "rightidle",
      frames: this.anims.generateFrameNames("player", {
        stat: 0,
        end: 1,
        prefix: "r_idle",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    // MOVE UP
    this.anims.create({
      key: "moveUp",
      frames: this.anims.generateFrameNames("player", {
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
      frames: this.anims.generateFrameNames("player", {
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
      frames: this.anims.generateFrameNames("player", {
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
      frames: this.anims.generateFrameNames("player", {
        stat: 0,
        end: 3,
        prefix: "r",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this._wkey.isDown) {
      // MOVE UP
      this.#player.setVelocity(0, -PLAYER_SPEED);
      this.#player.anims.play("moveUp", true);
      this.#playerDirection = 'up';
    } else if (this._skey.isDown) {
      // MOVE DOWN
      this.#player.setVelocity(0, PLAYER_SPEED);
      this.#player.anims.play("moveDown", true);
      this.#playerDirection = "down";
    } else if (this._akey.isDown) {
      // MOVE LEFT
      this.#player.setVelocity(-PLAYER_SPEED, 0);
      this.#player.anims.play("moveLeft", true);
      this.#playerDirection = "left";
    } else if (this._dkey.isDown) {
      // MOVE RIGHT
      this.#player.setVelocity(PLAYER_SPEED, 0);
      this.#player.anims.play("moveRight", true);
      this.#playerDirection = "right";
    } else {
      // IDLE
      this.#player.setVelocity(0, 0);
      switch (this.#playerDirection) {
        case "up":
          this.#player.anims.play("upidle", true);
          break;
        case "down":
          this.#player.anims.play("downidle", true);
          break;
        case "left":
          this.#player.anims.play("leftidle", true);
          break;
        case "right":
          this.#player.anims.play("rightidle", true);
          break;
      }
      
    }
  }
}
