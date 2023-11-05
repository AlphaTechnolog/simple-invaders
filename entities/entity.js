export default class Entity {
  constructor(ctx) {
    this.ctx = ctx;
    this.configured = false;
  }

  onkeyup(cb) {
    window.boardState.canvas.addEventListener('keyup', e => {
      e.preventDefault()

      // if this entity is still in the current scene
      // we can execute the handler, else, it's because
      // it already have been deleted/destroyed somehow
      if (this.scene.entities.find(ent => ent === this)) {
        this[cb](e)
      }
    })
  }

  configure() {
    if (this.configured === false) {
      this.presetup();
      this.configured = true;
    }
  }

  setScene(scene) {
    this.scene = scene;
  }

  predraw() {
    if (!this.scene) {
      throw new Error("Invalid scene, please set the scene binding before calling draw()");
    }
  }

  // methods to be overriden
  presetup() {}
  draw() {}
  postdraw() {}

  // drawing methods
  square({ color, position, size }) {
    this.ctx.fillStyle = color

    this.ctx.fillRect(
      position.x, position.y,
      size.x, size.y
    )
  }
}
