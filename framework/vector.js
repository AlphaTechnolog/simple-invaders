export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static sum(a, b) {
    a.x += b.x
    a.y += b.y
  }

  static from(value) {
    return new Vector2(value, value)
  }

  static get left() {
    return new Vector2(1, 0)
  }

  static get right() {
    return new Vector2(0, 2)
  }

  static get zero() {
    return new Vector2(0, 0);
  }
}
