import select from "@inquirer/select";
import Pacman from "./Pacman";
import { Direction } from "./types";

export default class PacmanCLI {
  private GRID_SIZE;
  private pacman;

  constructor(gridSize: number = 5) {
    this.GRID_SIZE = gridSize;
    this.pacman = new Pacman(gridSize);
  }

  async run() {
    const command = await this.#menu();

    if (command === "exit") {
      return;
    } else if (command === "place") {
      await this.#place();
    } else {
      const pacmanProto = Object.getPrototypeOf(this.pacman);
      if (pacmanProto.hasOwnProperty(command)) {
        pacmanProto[command].bind(this.pacman)();
      }
    }

    this.run();
  }

  async #menu() {
    return await select({
      message: "Choose a command",
      choices: [
        {
          value: "place",
          name: "PLACE",
          description: "Place Pacman somewhere on the grid",
        },
        {
          value: "move",
          name: "MOVE",
          description: "Move Pacman one square in the direction he is facing",
        },
        {
          value: "left",
          name: "LEFT",
          description: "Turn Pacman 90º to the left",
        },
        {
          value: "right",
          name: "RIGHT",
          description: "Turn Pacman 90º to the right",
        },
        {
          value: "report",
          name: "REPORT",
          description: "Print Pacmans position",
        },
        {
          value: "exit",
          name: "EXIT",
        },
      ],
    });
  }

  async #place() {
    const [x, y, direction] = [
      await select({
        message: "Enter the X coordinate",
        choices: Array.from({ length: this.GRID_SIZE }).map((_, i) => ({
          value: i,
        })),
      }),
      await select({
        message: "Enter the Y coordinate",
        choices: Array.from({ length: this.GRID_SIZE }).map((_, i) => ({
          value: i,
        })),
      }),
      await select({
        message: "Enter the direction",
        choices: Object.values(Direction)
          .filter((val) => typeof val === "string")
          .map((val, i) => ({
            value: i,
            name: val as string,
          })),
      }),
    ];

    this.pacman.place({ x, y, direction });
  }
}
