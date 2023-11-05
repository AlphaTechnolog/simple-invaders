export default class Scene {
  constructor(ctx) {
    this.ctx = ctx;
    this.entities = [];
    this.didSetup = false;
  }

  registerEntity(entity) {
    this.entities.push(entity);
  }

  destroyEntity(entity) {
    this.entities = this.entities.filter((ent) =>
      ent !== entity);
  }

  clearEntities() {
    this.entities = []
  }

  GetEntity(Entity) {
    const entity = new Entity(this.ctx);
    entity.configure();
    entity.setScene(this);
    return entity;
  }

  findEntity(Entity) {
    return this.entities.filter(ent => ent instanceof Entity)
  }

  configure() {
    if (this.didSetup === false) {
      this.entrypoint();
      this.setup();
      this.didSetup = true;
    }
  }

  setup() {
    this.keystate = {}

    // helper which saves if a key is pressed or not in the
    // desired document event, such as keydown or keyup.
    const handler = (value) => (e) => {
      e.preventDefault();
      this.keystate[e.key] = value;
    }

    const { canvas } = window.boardState;

    // creating the keystate
    canvas.addEventListener('keydown', handler(true), false);
    canvas.addEventListener('keyup', handler(false), false);

    // making bindings for the entities
    this.entities.forEach(entity => {
      entity.keystate = this.keystate
    })
  }

  _drawEntity(entity) {
    entity.predraw();
    entity.draw();
    entity.postdraw();
  }

  draw() {
    this.loop()
    this.entities.forEach(this._drawEntity);
  }

  // methods to be overriden
  entrypoint() {}
  loop() {}
}
