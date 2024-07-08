import grassTiles from "../../../../Assets/Environment/Grass.png";
import hillTiles from "../../../../Assets/Environment/Hills.png";
import collisionTiles from "../../../../Assets/Collision.png";
import treeBig from "./../../../../Assets/Environment/tree_medium.png";
import treeSmall from "./../../../../Assets/Environment/tree_small.png";
import mapJSON from "../../../../Data/MapData.json";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // loading assets for world generation
    // 1) loading the tilesets
    this.load.image("grassTiles", grassTiles);
    this.load.image("hillTiles", hillTiles);
    this.load.image("collisionTiles", collisionTiles);
    // 2) loading the map data
    this.load.tilemapTiledJSON("map", mapJSON);

    // loading tree for object
    this.load.image("treeBig", treeBig);
    this.load.image("treeSmall", treeSmall);
  }

  create() {
    this.scene.start("MainGame");
  }
}
