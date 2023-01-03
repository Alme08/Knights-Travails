const board = [
  ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a'],
  ['1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b'],
  ['1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c'],
  ['1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d'],
  ['1e', '2e', '3e', '4e', '5e', '6e', '7e', '8e'],
  ['1f', '2f', '3f', '4f', '5f', '6f', '7f', '8f'],
  ['1g', '2g', '3g', '4g', '5g', '6g', '7g', '8g'],
  ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h']];

const moves = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

class Node {
  constructor(row, col, distanceFromStartPosition, path) {
    this.row = row;
    this.col = col;
    this.distanceFromStartPosition = distanceFromStartPosition;
    this.path = path;
    this.directions = [];
  }

  getPath() {
    return this.path;
  }

  getPosition() {
    return `${this.row}, ${this.col}`;
  }

  getDirections() {
    moves.forEach((move) => {
      const [rowChange, colChange] = move;

      const directionRow = this.row + rowChange;
      const directionCol = this.col + colChange;

      if (board?.[directionRow]?.[directionCol] !== undefined) {
        this.directions.push([directionRow, directionCol]);
      }
    });

    return this.directions;
  }
}

const knightMoves = (initialPosition, finalPosition) => {
  const startPosition = new Node(initialPosition[0], initialPosition[1], 0, []);
  const queue = [startPosition];
  const visited = new Set();

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode.row === finalPosition[0] && currentNode.col === finalPosition[1]) {
      console.log(`You made it in ${currentNode.distanceFromStartPosition} moves! Here's your path:`);
      currentNode.path.forEach((position) => {
        console.log(`[${position}]`);
      });
      console.log(`[${currentNode.getPosition()}]`);
      return;
    }

    visited.add(currentNode.getPosition());

    const currentDirections = currentNode.getDirections();

    currentDirections.forEach((direction) => {
      const [newRow, newCol] = direction;
      const newPath = (currentNode.path.length > 0)
        ? [...currentNode.path, [currentNode.getPosition()]] : [[currentNode.getPosition()]];
      const newNode = new Node(newRow, newCol, currentNode.distanceFromStartPosition + 1, newPath);

      if (visited.has(newNode.getPosition())) return;
      queue.push(newNode);
    });
  }
};
export default knightMoves;
