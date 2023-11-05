import Player from './player.js'
import Entity from './entity.js'
import { Vector2, Render, centered, random } from '../framework/index.js'
import MainScene from '../scenes/main.js'

export default class Enemy extends Entity {
  constructor(...args) {
    super(...args)
  }

  presetup() {
    this.render = new Render(this.ctx)
    this.size = 30
    this.acc = random(3, 7)

    this.position = new Vector2(
      centered(window.boardState.width, this.size),
      window.boardState.height - this.size
    )
  }

  draw() {
    this.animateFrame()
    this.checkCollision()
    this.render.square({
      size: Vector2.from(this.size),
      color: 'red',
      position: this.position
    })
  }

  animateFrame() {
    this.position.y -= this.acc

    // substract one life
    if (this.position.y + this.size < 0) {
      this.scene.destroyEntity(this)
      this.scene.lifes-- // main scene variable
    }
  }

  getPlayer() {
    this.player = this.scene.findEntity(Player)[0]
  }

  // just checks if the current scene is the main
  // one, shouldn't fail the validation but still
  // it's a great idea just to check in case
  sceneCheck() {
    if (!this.checked) {
      this.checked = true
      if (!(this.scene instanceof MainScene)) {
        throw new Error("Enemy requires a `MainScene` to be used.")
      }
    }
  }

  checkCollision() {
    this.sceneCheck()

    // gets the player if needed but if it can't be
    // encountered, we're just going to stop validation
    // since, maybe, the player have been removed by others
    // entities or by the scene itself.
    if (!this.player) {
      if (!!(this.player = this.scene.findEntity(Player)[0])) {
        return;
      }
    }

    // checking range of positions between the player and the
    // current enemy in order to make a game over splash
    if (
      this.position.x + this.size >= this.player.position.x &&
      this.position.x <= this.player.position.x + this.player.size &&
      this.position.y + this.size >= this.player.position.y &&
      this.position.y <= this.player.position.y + this.player.size
    ) {
      this.scene.destroyEntity(this);
      this.scene.gameover(); // main scene only method.
    }
  }
}
