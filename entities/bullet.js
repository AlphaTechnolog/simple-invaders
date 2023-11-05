import Entity from './entity.js'
import Enemy from './enemy.js'
import { Render, Vector2 } from '../framework/index.js'

export default class Bullet extends Entity {
  constructor(ctx) {
    super(ctx)
  }

  presetup() {
    this.position = Vector2.zero
    this.size = 10
    this.acc = 7
    this.render = new Render(this.ctx)
  }

  draw() {
    this.animateFrame()
    this.checkCollision()
    this.render.square({
      color: 'white',
      position: this.position,
      size: Vector2.from(this.size)
    })
  }

  animateFrame() {
    this.position.y += this.acc
    if (this.position.y >= window.boardState.height) {
      this.scene.destroyEntity(this);
    }
  }

  // checks if a bullet impacted with an enemy
  checkCollision() {
    this.scene.findEntity(Enemy).forEach(enemy => {
      if (
        this.position.x + this.size >= enemy.position.x &&
        this.position.x <= enemy.position.x + enemy.size &&
        this.position.y + this.size >= enemy.position.y &&
        this.position.y <= enemy.position.y + enemy.size
      ) {
        this.scene.destroyEntity(enemy)
        this.scene.destroyEntity(this)
        this.scene.score++
      }
    })
  }
}
