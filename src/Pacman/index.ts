import { Direction, Position, Turn } from "../types";

export default class Pacman {
  #position: Position | null;
  #GRID_SIZE;

  constructor(gridSize: number) {
    this.#GRID_SIZE = gridSize;
    this.#position = null;
  }

  place(position: Position) {
    if (!this.#isWithinBounds(position)) return;
    this.#position = position;
  }

  move() {
    if (!this.#position) return;

    switch (this.#position.direction) {
      case Direction.NORTH:
        if (this.#position.y < this.#GRID_SIZE) this.#position.y++;
        break;
      case Direction.EAST:
        if (this.#position.x < this.#GRID_SIZE) this.#position.x++;
        break;
      case Direction.SOUTH:
        if (this.#position.y > 0) this.#position.y--;
        break;
      case Direction.WEST:
        if (this.#position.x > 0) this.#position.x--;
        break;
    }
  }

  left() {
    this.#changeDirection(Turn.LEFT);
  }

  right() {
    this.#changeDirection(Turn.RIGHT);
  }

  report() {
    if (this.#position)
      console.log(
        [
          this.#position.x,
          this.#position.y,
          Direction[this.#position.direction],
        ].join(", ")
      );
  }

  get position() {
    return this.#position
  }

  // private methods
  #isWithinBounds({ x, y, direction }: Position): boolean {
    return (
      x > 0 &&
      x < this.#GRID_SIZE &&
      y > 0 &&
      y < this.#GRID_SIZE &&
      Object.values(Direction).includes(direction)
    );
  }

  #changeDirection(turn: Turn) {
    if (!this.#position) return;
    // enums are reverse mapped, so must divide by 2 to get actual length
    const directionsLength = Object.values(Direction).length / 2;
    this.#position.direction =
      (this.#position.direction + turn + directionsLength) % directionsLength;
  }
}
