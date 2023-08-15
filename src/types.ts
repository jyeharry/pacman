export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export enum Turn {
  LEFT = -1,
  RIGHT = 1,
}

export type Position = {
  x: number
  y: number
  direction: Direction
}
