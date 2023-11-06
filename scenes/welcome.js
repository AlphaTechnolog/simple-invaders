import MainScene from './main.js'

import {
  Scene,
  Vector2,
  centered,
  keymaps
} from '../framework/index.js'

export default class WelcomeScene extends Scene {
  constructor(...args) {
    super(...args)
  }

  entrypoint() {
    this.oldtimestamp = undefined
    this.detailColor = 'yellow'
  }

  welcomeCalculations() {
    const size = {
      title: new Vector2(280, 10),
      detail: new Vector2(105, 2),
    }

    const titlePosition = new Vector2(
      centered(boardState.width, size.title.x),
      centered(boardState.height, size.title.y)
    );

    // 14 is a little gap just for aesthetics purposes
    const detailPosition = new Vector2(
      centered(boardState.width, size.detail.x),
      centered(boardState.height, size.detail.y) + (size.title.y / 2) + 14,
    );
  
    return {
      size,
      position: {
        title: titlePosition,
        detail: detailPosition
      }
    }
  }

  renderUi() {
    const { position, size } = this.welcomeCalculations()

    // main title
    this.ctx.font = '40px Arial'
    this.ctx.fillStyle = 'white'

    this.ctx.fillText(
      'Simple Invaders',
      position.title.x, position.title.y,
      size.title.x
    )

    // press enter to begin
    this.ctx.font = '12px Arial'

    this.ctx.fillStyle = this.detailColor

    if (!this.oldtimestamp || timeinfo.timestamp - this.oldtimestamp >= 1 * 1000) {
      this.detailColor = this.detailColor === 'yellow' ? 'red' : 'yellow'
      this.oldtimestamp = timeinfo.timestamp
    }

    this.ctx.fillText(
      'Press enter to begin',
      position.detail.x, position.detail.y,
      size.detail.x
    )
  }

  loop() {
    this.renderUi()

    if (this.keystate[keymaps.enter]) {
      currentScene = new MainScene(this.ctx)
    }
  }
}
