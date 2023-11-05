import Entity from './entity.js';
import Bullet from './bullet.js';
import { Render, Vector2, centered, keymaps } from '../framework/index.js';

export default class Player extends Entity {
  constructor(...args) {
    super(...args)
  }

  presetup() {
    this.acc = 5;
    this.render = new Render(this.ctx)
    this.hooks()

    this.size = 30;
    this.position = new Vector2(
      centered(window.boardState.width, this.size),
      centered(window.boardState.height, this.size)
    )
  }

  hooks() {
    this.onkeyup('bulletSpawner')
  }

  draw() {
    this.keyhandler();

    this.square({
      color: 'white',
      position: this.position,
      size: Vector2.from(this.size)
    })
  }

  movePlayer() {
    if (this.keystate[keymaps.left]) this.position.x -= this.acc;
    if (this.keystate[keymaps.right]) this.position.x += this.acc;
    if (this.keystate[keymaps.up]) this.position.y -= this.acc;
    if (this.keystate[keymaps.down]) this.position.y += this.acc;
  }

  checkOutOfBounds() {
    if (this.position.x < 0) this.position.x += this.acc;
    if (this.position.x + this.size > window.boardState.width) this.position.x -= this.acc;
    if (this.position.y < 0) this.position.y += this.acc;
    if (this.position.y + this.size > window.boardState.height) this.position.y -= this.acc;
  }

  bulletSpawner({ key }) {
    if (key !== keymaps.space) return
    const bullet = this.scene.GetEntity(Bullet);
    bullet.position.x = this.position.x + centered(this.size, bullet.size)
    bullet.position.y = this.position.y + this.size
    this.scene.registerEntity(bullet)
  }

  keyhandler() {
    this.movePlayer();
    this.checkOutOfBounds();
  }
}
