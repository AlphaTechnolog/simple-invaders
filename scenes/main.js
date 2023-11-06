import Player from '../entities/player.js';
import Enemy from '../entities/enemy.js';

import {
  Scene,
  Vector2,
  Timer,
  Render,
  random,
  centered
} from '../framework/index.js'

export default class MainScene extends Scene {
  constructor(...args) {
    super(...args)
  }

  entrypoint() {
    this.enemiesTimer = new Timer()
    this.endGame = false
    this.score = 0
    this.lifes = 3
    this.gaps = 4 // just a little gaps for the ui toolbars
    this.renderer = new Render(this.ctx)
    this.registerEntity(this.GetEntity(Player));
  }

  async enemiesSpawner() {
    await this.enemiesTimer.sleep(random(1, 3))
    const newEnemy = this.GetEntity(Enemy)
    newEnemy.position.x = random(0, boardState.width - newEnemy.size)
    this.registerEntity(newEnemy)
  }

  gameOverText() {
    const maxWidth = 120;
    const maxHeight = 30;
    return {
      maxWidth,
      dimensions: new Vector2(
        centered(boardState.width, maxWidth),
        centered(boardState.height, maxHeight),
      )
    }
  }

  gameOverSplash() {
    const { dimensions, maxWidth } = this.gameOverText();
    this.ctx.font = '24px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("Game Over", dimensions.x, dimensions.y, maxWidth);
  }

  scoreToolbar() {
    this.ctx.font = '12px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Score: ${this.score}`, this.gaps, this.gaps * 4);
  }

  lifesToolbar() {
    const prefixWidth = 30 // the exact value for the string ;-;
    const y = this.gaps * 4 * 2

    this.ctx.font = '12px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Lifes:`, this.gaps, y, prefixWidth)

    let x = prefixWidth + this.gaps * 2

    for (let i = 0; i < this.lifes; ++i) {
      this.renderer.square({
        size: Vector2.from(5),
        position: new Vector2(x, y - 6),
        color: 'red'
      })

      x += 5 + this.gaps
    }
  }

  renderUi() {
    this.scoreToolbar()
    this.lifesToolbar()
  }

  loop() {
    if (this.endGame) return this.gameOverSplash();
    if (this.lifes <= 0) return this.gameover();
    this.enemiesSpawner()
    this.renderUi()
  }

  // triggered by enemies entities
  // or when lifes <= 0
  gameover() {
    this.clearEntities();
    this.endGame = true;
  }
}
