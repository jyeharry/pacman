# Pacman Simulator

## Summary

This is my solution to a coding challenge given to me by IE.

The program is a command line app. It's purpose is to place Pacman onto a grid and be able to move it around using prompts from the user.

### Constraints

- Pacman must not move off the grid during movement. This also includes the initial placement of Pacman.
- Any move that would cause Pacman to fall must be ignored.

## Installation

Install the packages and build the app

```bash
npm install
npm run build
```

## Usage

The app is started with the following command:

```bash
npm run pacman
```

The user is then presented with a list of commands to choose from. The user can use the arrow keys or vim keys ('j' and 'k') to cycle through the list of commands, then press 'Enter' to select one.

## Commands

- **PLACE**: takes three arguments; x coordinate, y coordinate and direction.
- **MOVE**: moves Pacman forward one space.
- **LEFT**: turns Pacman left 90º.
- **RIGHT**: turns Pacman right 90º.
- **REPORT**: logs Pacmans position in the format 'x, y, DIRECTION'.
- **EXIT**: exits the app.

## Testing

Tests for the Pacman class have been included:

```bash
npm test
```
