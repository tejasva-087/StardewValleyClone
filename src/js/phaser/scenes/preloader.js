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

import mapJSON from "../../../resources/mapData.json";
import objectCollisionData from "../../../resources/Plants.json";

import player from "../../../assets/characterSprite/character.png";
import playerSpriteData from "../../../assets/characterSprite/character.json";



export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // loding map data
    this.load.tilemapTiledJSON("map", mapJSON);
    this.load.json("objectCollision", objectCollisionData);

    // loading world generation assets
    this.load.image("grass", grassTiles);
    this.load.image("hills", hillTiles);
    this.load.image("collision", collisionTiles);

    this.load.image("treeBig", treeBig);
    this.load.image("treeSmall", treeSmall);
    this.load.image("bush", bush);
    this.load.image("mushroom", mushroom);
    this.load.image("mushrooms", mushrooms);
    this.load.image("flower", flower);

    // loading the player's sprite file
    this.load.atlas("player", player, playerSpriteData);
  }

  create() {
    this.scene.start("MainGame");
  }
}
