export default class WorldGeneration extends Phaser.Scene {
  #tileSet = [];
  #map;
  #object = [];

  constructor() {
    super("WorldGeneration");
  }

  create() {
    // creating the world
    // 1) creating the map
    this.#map = this.make.tilemap({ key: "map" });
    // 2) creating tileset
    this.#tileSet[0] = this.#map.addTilesetImage("Grass", "grassTiles");
    this.#tileSet[1] = this.#map.addTilesetImage("Hills", "hillTiles");
    this.#tileSet[3] = this.#map.addTilesetImage("Grass", "grassTiles");
    // 3) creating layers
    this.#map.createLayer("Ground", this.#tileSet[0]);
    this.#map.createLayer("Hills", this.#tileSet[1]);
    this.#map.createLayer("Grass", this.#tileSet[0]);

    // 4) creating object
    this.#object[0] = this.#map.getObjectLayer("TreeBig");
    this.#object[1] = this.#map.getObjectLayer("TreeSmall");

    // Spawning trees from object and making them a physicsl object
    this.#object[0].objects.forEach((object) => {
      this.physics.add.image(object.x, object.y, "treeBig");
    });

    this.#object[1].objects.forEach((object) => {
      this.physics.add.image(object.x, object.y, "treeSmall");
    });
  }
}
