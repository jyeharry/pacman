import { Direction, Position, Turn } from "./types";

class Pacman {
  private position: Position | null;
  private MAX_BOUND;
  private MIN_BOUND;

  constructor(minBound: number, maxBound: number) {
    this.MIN_BOUND = minBound;
    this.MAX_BOUND = maxBound;
    this.position = null;
  }

  place(position: Position) {
    if (!this.isWithinBounds(position)) return;
    this.position = position;
  }

  move() {
    if (!this.position) return;

    switch (this.position.direction) {
      case Direction.NORTH:
        if (this.position.y < this.MAX_BOUND) {
          this.position.y++;
        }
        break;
      case Direction.EAST:
        if (this.position.x < this.MAX_BOUND) {
          this.position.x++;
        }
        break;
      case Direction.SOUTH:
        if (this.position.y > this.MIN_BOUND) {
          this.position.y++;
        }
        break;
      case Direction.WEST:
        if (this.position.x > this.MIN_BOUND) {
          this.position.x++;
        }
        break;
    }
  }

  left() {
    this.changeDirection(Turn.LEFT);
  }

  right() {
    this.changeDirection(Turn.RIGHT);
  }

  report() {
    if (this.position)
      return `${this.position.x}, ${this.position.y}, ${this.position.direction}`;
  }

  private isWithinBounds({ x, y, direction }: Position): boolean {
    return (
      x > this.MIN_BOUND &&
      x < this.MAX_BOUND &&
      y > this.MIN_BOUND &&
      y < this.MAX_BOUND &&
      Object.values(Direction).includes(direction)
    );
  }

  private changeDirection(turn: Turn) {
    if (!this.position) return;
    // enums are reverse mapped, so must divide by 2 to get actual length
    const directionsLength = Object.values(Direction).length / 2;
    this.position.direction =
      (this.position.direction + turn + directionsLength) % directionsLength;
  }
}
