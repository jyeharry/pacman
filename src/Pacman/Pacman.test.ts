import { Direction, Position } from "../types";
import Pacman from "./";

describe("Pacman methods", () => {
  let pacman: Pacman;
  let gridSize = 5;

  beforeEach(() => {
    pacman = new Pacman(gridSize);
  });

  describe("constructor", () => {
    it("creates a new Pacman object", () => {
      expect(pacman).toBeDefined();
    });

    it("gives null value to position property", () => {
      expect(pacman.position).toBeNull();
    });
  });

  describe("place", () => {
    const validPosition = { x: 2, y: 1, direction: Direction.NORTH };

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
});
