export class Render {
  constructor(ctx) {
    this.ctx = ctx
  }

  square({ size, position, color }) {
    this.ctx.fillStyle = color

    this.ctx.fillRect(
      position.x, position.y,
      size.x, size.y
    )
  }
}
