import { Direction, Position, Turn } from "../types";
import Pacman from "./";

describe("Pacman methods", () => {
  let pacman: Pacman;
  const gridSize = 5;
  const validPosition = { x: 2, y: 2, direction: Direction.NORTH };

  beforeEach(() => {
    pacman = new Pacman(gridSize);
  });

  describe(".constructor", () => {
    it("creates a new Pacman object", () => {
      expect(pacman).toBeDefined();
    });

    it("gives null value to position property", () => {
      expect(pacman.position).toBeNull();
    });
  });

  describe(".place", () => {
    beforeEach(() => {
      pacman.place(validPosition);
    });

    describe("when valid", () => {
      it.each<[keyof Position, number, number]>([
        ["x", 0, gridSize],
        ["y", 0, gridSize],
      ])("sets Pacmans %s coordinate within grid", (key, gridMin, gridMax) => {
        expect(pacman.position?.[key]).toBeGreaterThanOrEqual(gridMin);
        expect(pacman.position?.[key]).toBeLessThanOrEqual(gridMax);
      });

      it("sets Pacmans direction to a valid direction", () => {
        expect(Object.values(Direction)).toContain(pacman.position?.direction);
      });
    });

    describe("when invalid", () => {
      const invalidPosition = {
        x: -1,
        y: gridSize + 1,
        direction: Direction.NORTH,
      };

      it("does not change Pacmans position", () => {
        pacman.place(invalidPosition);
        expect(pacman.position).not.toEqual(invalidPosition);
        expect(pacman.position).toEqual(validPosition);
      });
    });
  });

  describe(".move", () => {
    describe("when Pacman is not on the edge of the grid", () => {
      it.each<[keyof typeof Direction, string, keyof Position, number]>([
        ["NORTH", "increments", "y", validPosition.y + 1],
        ["EAST", "increments", "x", validPosition.x + 1],
        ["SOUTH", "decrements", "y", validPosition.y - 1],
        ["WEST", "decrements", "x", validPosition.x - 1],
      ])(
        "facing %s its %s %s coordinate by 1",
        (direction, _, coordKey, coordValue) => {
          pacman.place({ ...validPosition, direction: Direction[direction] });
          pacman.move();
          expect(pacman.position?.[coordKey]).toEqual(coordValue);
        }
      );
    });

    describe("when Pacman is on the edge of the grid", () => {
      it.each<[keyof typeof Direction, keyof Position, number]>([
        ["NORTH", "y", gridSize - 1],
        ["EAST", "x", gridSize - 1],
        ["SOUTH", "y", 0],
        ["WEST", "x", 0],
      ])(
        "facing %s its %s coordinate does not change",
        (direction, coordKey, edgeValue) => {
          pacman.place({
            ...validPosition,
            [coordKey]: edgeValue,
            direction: Direction[direction],
          });
          pacman.move();
          expect(pacman.position?.[coordKey]).toEqual(edgeValue);
        }
      );
    });

    describe("when Pacmans position is null", () => {
      it("position does not change", () => {
        pacman.move();
        expect(pacman.position).toBeNull();
      });
    });
  });

  describe(".left and .right", () => {
    it.each<
      [keyof typeof Direction, keyof typeof Turn, keyof typeof Direction]
    >([
      ["NORTH", "LEFT", "WEST"],
      ["WEST", "LEFT", "SOUTH"],
      ["SOUTH", "LEFT", "EAST"],
      ["EAST", "LEFT", "NORTH"],
      ["NORTH", "RIGHT", "EAST"],
      ["EAST", "RIGHT", "SOUTH"],
      ["SOUTH", "RIGHT", "WEST"],
      ["WEST", "RIGHT", "NORTH"],
    ])(
      "when facing %s Pacman turns %s to face %s",
      (oldDirection, turn, newDirection) => {
        pacman.place({ ...validPosition, direction: Direction[oldDirection] });
        turn === "LEFT" ? pacman.left() : pacman.right();
        expect(pacman.position?.direction).toEqual(Direction[newDirection]);
      }
    );

    describe("when Pacmans position is null", () => {
      it.each<keyof typeof Turn>(["LEFT", "RIGHT"])(
        "turning %s does not change direction",
        (turn) => {
          turn === "LEFT" ? pacman.left() : pacman.right();
          expect(pacman.position).toBeNull();
        }
      );
    });
  });

  describe(".report", () => {
    describe("when position is not null", () => {
      it("returns position string in format 'x, y, direction'", () => {
        pacman.place(validPosition);
        expect(pacman.report()).toEqual(
          [
            validPosition.x,
            validPosition.y,
            Direction[validPosition.direction],
          ].join(", ")
        );
      });
    });

    describe("when position is null", () => {
      it("returns undefined", () => {
        expect(pacman.position).toBeNull();
        expect(pacman.report()).toBeUndefined();
      });
    });
  });
});
